/**
 * Payload Validation Utilities
 * Provides consistent field validation across all admin forms
 * Prevents "undefined" strings and ensures proper data serialization
 */

/**
 * Validates a single field value
 * Ensures no literal "undefined" strings are transmitted
 * 
 * @param value - The value to validate (any type)
 * @param fieldName - Name of field for logging
 * @returns Validated string or null if invalid
 * 
 * @example
 * validateField("Hello", "title") → "Hello"
 * validateField("undefined", "title") → null (prevents string "undefined")
 * validateField(undefined, "title") → null
 * validateField("", "title") → null (prevents empty strings)
 */
export function validateField(value: unknown, fieldName?: string): string | null {
  const logPrefix = fieldName ? `[${fieldName}]` : '';
  
  // Catch literal "undefined" string (CRITICAL BUG FIX)
  if (value === 'undefined') {
    console.warn(`⚠️  ${logPrefix} Caught literal "undefined" string - preventing transmission`);
    return null;
  }
  
  // Check for null or undefined
  if (value === undefined || value === null) {
    return null;
  }
  
  // Check for boolean false (shouldn't be in string fields but prevent)
  if (value === false) {
    return null;
  }
  
  // Convert to string and trim whitespace
  const strValue = String(value).trim();
  
  // Triple-check for "undefined", "null", or empty strings
  if (!strValue || strValue === 'undefined' || strValue === 'null') {
    return null;
  }
  
  return strValue;
}

/**
 * Validates multiple fields and returns only valid key-value pairs
 * Useful for batch field validation
 * 
 * @param fields - Object with field names as keys and values
 * @returns Object with only validated non-null fields
 * 
 * @example
 * const fields = { title: "Dr. X", description: "", notes: "undefined" }
 * const valid = validateFields(fields)
 * // Returns: { title: "Dr. X" }
 */
export function validateFields(fields: Record<string, unknown>): Record<string, string> {
  const validated: Record<string, string> = {};
  
  for (const [key, value] of Object.entries(fields)) {
    const validValue = validateField(value, key);
    if (validValue !== null) {
      validated[key] = validValue;
      console.log(`✅ VALID: ${key} = "${validValue}"`);
    } else {
      console.log(`⏭️  SKIPPED: ${key} (null/empty/invalid)`);
    }
  }
  
  return validated;
}

/**
 * Builds FormData with validated fields
 * Prevents malformed payloads by ensuring all fields are valid
 * 
 * @param fieldMap - Array of {name, value} pairs
 * @param metadata - Optional metadata to append (language, timestamps, etc)
 * @returns FormData with validated fields
 * 
 * @example
 * const fieldMap = [
 *   { name: 'title', value: formState.title },
 *   { name: 'description', value: formState.description }
 * ]
 * const metadata = { language_code: 'az' }
 * const formData = buildValidatedFormData(fieldMap, metadata)
 */
export function buildValidatedFormData(
  fieldMap: Array<{ name: string; value: unknown }>,
  metadata: Record<string, string> = {}
): FormData {
  const formData = new FormData();
  let validFieldCount = 0;
  
  console.log('🔨 Building validated FormData...');
  
  // Add metadata first (language codes, timestamps, etc)
  for (const [key, value] of Object.entries(metadata)) {
    formData.append(key, value);
    console.log(`📌 METADATA: ${key} = "${value}"`);
  }
  
  // Validate and add each field
  for (const field of fieldMap) {
    const validatedValue = validateField(field.value, field.name);
    
    if (validatedValue !== null) {
      formData.append(field.name, validatedValue);
      validFieldCount++;
      console.log(`✅ APPENDED: ${field.name} = "${validatedValue}"`);
    } else {
      console.log(`⏭️  SKIPPED: ${field.name} (invalid)`);
    }
  }
  
  console.log(`📦 FormData complete: ${validFieldCount} fields + metadata`);
  return formData;
}

/**
 * Validates file for upload
 * Checks size, type, and basic validity
 * 
 * @param file - File object to validate
 * @param maxSizeMB - Maximum file size in megabytes (default: 5)
 * @param allowedTypes - Allowed MIME types (default: image/*)
 * @returns {valid: boolean, error?: string}
 */
export function validateFile(
  file: File | null | undefined,
  maxSizeMB: number = 5,
  allowedTypes: string[] = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml']
): { valid: boolean; error?: string } {
  if (!file) {
    return { valid: true }; // File is optional
  }
  
  // Check file size
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    return {
      valid: false,
      error: `File size exceeds ${maxSizeMB}MB limit. Current: ${(file.size / 1024 / 1024).toFixed(2)}MB`
    };
  }
  
  // Check file type
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `File type not allowed. Allowed types: ${allowedTypes.join(', ')}`
    };
  }
  
  console.log(`✅ File validated: ${file.name} (${(file.size / 1024).toFixed(2)}KB)`);
  return { valid: true };
}

/**
 * Ensures multi-language consistency
 * Validates that all required language codes are present
 * 
 * @param languages - Array of language codes (e.g., ['az', 'en', 'ru'])
 * @param dataMap - Map of language to data object
 * @returns Object indicating which languages have complete data
 */
export function validateMultiLanguageConsistency(
  languages: string[],
  dataMap: Record<string, Record<string, unknown>>
): {
  complete: string[];
  incomplete: string[];
  summary: Record<string, { fields: number; complete: boolean }>;
} {
  const result = {
    complete: [] as string[],
    incomplete: [] as string[],
    summary: {} as Record<string, { fields: number; complete: boolean }>
  };
  
  for (const lang of languages) {
    const langData = dataMap[lang];
    const validFields = Object.values(langData).filter(v => validateField(v) !== null).length;
    
    const isComplete = validFields > 0;
    result.summary[lang] = {
      fields: validFields,
      complete: isComplete
    };
    
    if (isComplete) {
      result.complete.push(lang);
      console.log(`✅ ${lang.toUpperCase()}: ${validFields} fields complete`);
    } else {
      result.incomplete.push(lang);
      console.log(`⚠️  ${lang.toUpperCase()}: No complete data`);
    }
  }
  
  return result;
}

/**
 * Synchronizes timestamps across language entries
 * Ensures all language variants have the same created_at/updated_at
 * 
 * @param entries - Array of data objects with timestamps
 * @param useNow - If true, uses current timestamp; if false, uses earliest created_at
 * @returns Updated entries with synchronized timestamps
 */
export function syncTimestamps(
  entries: Array<Record<string, any>>,
  useNow: boolean = false
): Array<Record<string, any>> {
  if (entries.length === 0) return entries;
  
  const now = new Date().toISOString();
  
  let createdAt: string;
  if (useNow) {
    createdAt = now;
  } else {
    // Use the earliest created_at from all entries
    const createdAtDates = entries
      .map(e => e.created_at)
      .filter(Boolean)
      .sort();
    createdAt = createdAtDates[0] || now;
  }
  
  const updatedAt = now;
  
  console.log(`🕐 Syncing timestamps for ${entries.length} entries`);
  console.log(`   created_at: ${createdAt}`);
  console.log(`   updated_at: ${updatedAt}`);
  
  return entries.map(entry => ({
    ...entry,
    created_at: createdAt,
    updated_at: updatedAt
  }));
}

/**
 * Logs the full payload for debugging
 * Shows exactly what will be sent to the API
 * 
 * @param formData - FormData object to log
 * @param title - Optional title for the log
 */
export function logPayload(formData: FormData, title: string = 'PAYLOAD'): void {
  console.log(`\n${'='.repeat(50)}`);
  console.log(`📤 ${title}`);
  console.log('='.repeat(50));
  
  // FormData entries can't be directly iterated in all environments
  // But we can log what we know
  let count = 0;
  for (const [key, value] of formData.entries()) {
    if (value instanceof File) {
      console.log(`  ${key}: [File] ${value.name} (${(value.size / 1024).toFixed(2)}KB)`);
    } else {
      console.log(`  ${key}: "${value}"`);
    }
    count++;
  }
  
  console.log(`Total: ${count} entries`);
  console.log('='.repeat(50) + '\n');
}
