import { DocumentType, CheckoutFormState } from '../types';

export interface ValidationResult {
  isValid: boolean;
  message: string;
}

export function validateDocNumber(type: DocumentType, docNumber: string): ValidationResult {
  const clean = docNumber.trim().replace(/\s+/g, '');
  
  if (!clean) {
    return { isValid: false, message: 'El número de documento es obligatorio.' };
  }

  if (type === 'CC') {
    const isOnlyDigits = /^\d+$/.test(clean);
    if (!isOnlyDigits) {
      return { isValid: false, message: 'La cédula de ciudadanía solo debe contener números sin puntos ni espacios.' };
    }
    if (clean.length < 6 || clean.length > 10) {
      return { isValid: false, message: 'La cédula colombiana debe tener entre 6 y 10 dígitos.' };
    }
    return { isValid: true, message: 'Cédula válida ✓' };
  }

  if (type === 'NIT') {
    const nitClean = clean.replace(/-/g, '');
    if (!/^\d{8,11}$/.test(nitClean)) {
      return { isValid: false, message: 'El NIT debe tener entre 8 y 10 dígitos (ej: 900123456-1).' };
    }
    return { isValid: true, message: 'NIT válido ✓' };
  }

  if (type === 'CE') {
    if (clean.length < 4 || clean.length > 12) {
      return { isValid: false, message: 'La C.E. debe tener entre 4 y 12 caracteres.' };
    }
    return { isValid: true, message: 'C.E. válida ✓' };
  }

  if (type === 'PAS') {
    if (clean.length < 5 || clean.length > 15) {
      return { isValid: false, message: 'El pasaporte debe tener entre 5 y 15 caracteres alfanuméricos.' };
    }
    return { isValid: true, message: 'Pasaporte válido ✓' };
  }

  if (type === 'PPT') {
    if (!/^\d{5,12}$/.test(clean)) {
      return { isValid: false, message: 'El PPT debe contener entre 5 y 12 dígitos numéricos.' };
    }
    return { isValid: true, message: 'PPT válido ✓' };
  }

  return { isValid: true, message: 'Documento ingresado ✓' };
}

export function validateFullName(name: string): ValidationResult {
  const clean = name.trim();
  if (!clean) {
    return { isValid: false, message: 'Por favor ingresa tu nombre completo.' };
  }

  if (clean.length < 5) {
    return { isValid: false, message: 'El nombre debe tener al menos 5 caracteres.' };
  }

  // Check if contains numbers or disallowed symbols
  if (/[0-9!@#$%^&*()_+={}[\]:;"'<>,.?/\\]/.test(clean)) {
    return { isValid: false, message: 'El nombre no debe contener números ni símbolos especiales.' };
  }

  const words = clean.split(/\s+/).filter(Boolean);
  if (words.length < 2) {
    return { isValid: false, message: 'Ingresa nombres y al menos un apellido (ej: Carlos Gómez).' };
  }

  return { isValid: true, message: 'Nombre verificado ✓' };
}

export function validatePhone(phone: string): ValidationResult {
  const clean = phone.replace(/[\s\-()]/g, '');
  if (!clean) {
    return { isValid: false, message: 'El número de teléfono es obligatorio para la entrega.' };
  }

  // In Colombia standard mobile is 10 digits, starting with 3 (300, 310, 312, 320, etc.)
  if (!/^\d{10}$/.test(clean)) {
    return { isValid: false, message: 'El número celular en Colombia debe tener 10 dígitos (ej: 312 456 7890).' };
  }

  if (!clean.startsWith('3')) {
    return { isValid: false, message: 'Los celulares colombianos inician por el dígito 3 (ej: 310..., 320...).' };
  }

  return { isValid: true, message: 'Celular válido para notificaciones ✓' };
}

export function validateEmail(email: string): ValidationResult {
  const clean = email.trim();
  if (!clean) {
    return { isValid: false, message: 'El correo electrónico es requerido para la factura y guía.' };
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(clean)) {
    return { isValid: false, message: 'Ingresa un correo electrónico válido (ej: usuario@correo.com).' };
  }

  return { isValid: true, message: 'Correo verificado ✓' };
}

export function validateAddress(address: string): ValidationResult {
  const clean = address.trim();
  if (!clean) {
    return { isValid: false, message: 'La dirección principal de entrega es obligatoria.' };
  }

  if (clean.length < 7) {
    return { isValid: false, message: 'Ingresa una dirección detallada (ej: Calle 127 # 15 - 45).' };
  }

  return { isValid: true, message: 'Dirección registrada ✓' };
}

export function detectCardFranchise(cardNumber: string): 'visa' | 'mastercard' | 'amex' | 'diners' | 'unknown' {
  const clean = cardNumber.replace(/\D/g, '');
  if (/^4/.test(clean)) return 'visa';
  if (/^5[1-5]/.test(clean) || /^2[2-7]/.test(clean)) return 'mastercard';
  if (/^3[47]/.test(clean)) return 'amex';
  if (/^3(?:0[0-5]|[68])/.test(clean)) return 'diners';
  return 'unknown';
}

export function validateCardNumber(cardNumber: string): ValidationResult {
  const clean = cardNumber.replace(/\D/g, '');
  if (!clean) {
    return { isValid: false, message: 'Ingresa el número de tarjeta.' };
  }

  if (clean.length < 13 || clean.length > 19) {
    return { isValid: false, message: 'El número de tarjeta debe tener entre 13 y 19 dígitos.' };
  }

  // Luhn Algorithm validation
  let sum = 0;
  let shouldDouble = false;
  for (let i = clean.length - 1; i >= 0; i--) {
    let digit = parseInt(clean.charAt(i), 10);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }

  if (sum % 10 !== 0) {
    return { isValid: false, message: 'Número de tarjeta inválido (falló verificación Luhn).' };
  }

  return { isValid: true, message: 'Tarjeta verificada ✓' };
}

export function validateCardExpiry(expiry: string): ValidationResult {
  const clean = expiry.replace(/\s+/g, '');
  if (!clean) {
    return { isValid: false, message: 'Ingresa la fecha de vencimiento (MM/AA).' };
  }

  if (!/^(0[1-9]|1[0-2])\/(\d{2}|\d{4})$/.test(clean)) {
    return { isValid: false, message: 'Formato inválido. Usa MM/AA (ej: 08/28).' };
  }

  const parts = clean.split('/');
  const month = parseInt(parts[0], 10);
  let year = parseInt(parts[1], 10);
  if (year < 100) {
    year += 2000;
  }

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  if (year < currentYear || (year === currentYear && month < currentMonth)) {
    return { isValid: false, message: 'La tarjeta está vencida.' };
  }

  if (year > currentYear + 15) {
    return { isValid: false, message: 'Año de vencimiento demasiado lejano.' };
  }

  return { isValid: true, message: 'Fecha válida ✓' };
}

export function validateCardCvv(cvv: string): ValidationResult {
  const clean = cvv.replace(/\D/g, '');
  if (!clean) {
    return { isValid: false, message: 'Ingresa el código de seguridad (CVV).' };
  }

  if (clean.length < 3 || clean.length > 4) {
    return { isValid: false, message: 'El CVV debe tener 3 o 4 dígitos.' };
  }

  return { isValid: true, message: 'CVV válido ✓' };
}
