import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

interface UploadedImage {
  file: File;
  preview: string;
}

@Component({
  selector: 'app-contact',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  contactForm: FormGroup;
  uploadedFiles: UploadedImage[] = [];
  zoomedImage: string | null = null;
  readonly slots = [0, 1, 2, 3];

  // Novos estados
  isGeneratingAI = false;
  isSubmitted = false;
  submittedData: any = null;

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.minLength(14)]], // Validação simples de tamanho mínimo com máscara
      email: ['', [Validators.required, Validators.email]],
      interest: ['', Validators.required],
      message: [''],
    });
  }

  get isSelling(): boolean {
    return this.contactForm.get('interest')?.value === 'vender';
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  // Máscara de Telefone
  onPhoneInput(event: any) {
    let value = event.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito

    // Limita tamanho
    if (value.length > 11) value = value.substring(0, 11);

    // Aplica a máscara (XX) XXXXX-XXXX
    if (value.length > 10) {
      value = value.replace(/^(\d\d)(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (value.length > 5) {
      value = value.replace(/^(\d\d)(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else if (value.length > 2) {
      value = value.replace(/^(\d\d)(\d{0,5})/, '($1) $2');
    } else {
      value = value.replace(/^(\d*)/, '($1');
    }

    // Atualiza o valor no FormControl sem disparar novo evento para evitar loop
    this.contactForm.get('phone')?.setValue(value, { emitEvent: false });
  }

  // Simulação de IA para melhorar texto
  improveWithAI() {
    const currentText = this.contactForm.get('message')?.value || '';

    this.isGeneratingAI = true;

    // Simula delay de API
    setTimeout(() => {
      let polishedText = '';
      if (currentText.length < 5) {
        polishedText =
          'Olá, gostaria de saber mais informações sobre os veículos disponíveis. Poderiam entrar em contato?';
      } else {
        polishedText = `Olá! ${currentText}. Gostaria de agendar uma visita ou receber mais detalhes. Aguardo retorno.`;
      }

      this.contactForm.patchValue({ message: polishedText });
      this.isGeneratingAI = false;
      this.cdr.detectChanges();
    }, 1500);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      if (this.uploadedFiles.length >= 4) {
        alert('Máximo de 4 imagens atingido.');
        input.value = '';
        return;
      }

      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.uploadedFiles = [
          ...this.uploadedFiles,
          {
            file: file,
            preview: e.target.result,
          },
        ];
        this.cdr.detectChanges();
      };

      reader.readAsDataURL(file);
      input.value = '';
    }
  }

  removeFile(index: number) {
    this.uploadedFiles.splice(index, 1);
  }

  openZoom(imageUrl: string) {
    this.zoomedImage = imageUrl;
    document.body.style.overflow = 'hidden';
  }

  closeZoom() {
    this.zoomedImage = null;
    document.body.style.overflow = 'auto';
  }

  onSubmit() {
    if (this.contactForm.valid) {
      // Salva os dados para o preview
      this.submittedData = this.contactForm.value;
      this.isSubmitted = true;

      // Scroll suave para garantir que o usuário veja a mensagem de sucesso se o form for longo
      const formElement = document.querySelector('form');
      if (formElement) formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      this.contactForm.markAllAsTouched();
    }
  }

  resetForm() {
    this.isSubmitted = false;
    this.submittedData = null;
    this.uploadedFiles = [];
    this.contactForm.reset();
    this.contactForm.get('interest')?.setValue('');
  }
}
