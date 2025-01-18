import React from 'react';

const ValidationIndicator = ({ isValid, showIndicator = true, className = '' }) => {
  if (!showIndicator) return null;
  
  return (
    <div 
      className={`w-2 h-2 rounded-full ${
        isValid ? 'bg-green-500' : 'bg-red-500 animate-pulse'
      } ${className}`}
      title={isValid ? 'Valid' : 'Required field'}
    />
  );
};

const useFormValidation = (fields, validationRules) => {
  const validateField = (fieldName, value) => {
    if (!validationRules[fieldName]) return true;
    return validationRules[fieldName](value);
  };

  const getFieldValidation = () => {
    const validation = {};
    for (const [fieldName, value] of Object.entries(fields)) {
      validation[fieldName] = validateField(fieldName, value);
    }
    return validation;
  };

  const isFormValid = () => {
    return Object.values(getFieldValidation()).every(isValid => isValid);
  };

  return {
    getFieldValidation,
    isFormValid
  };
};

// Higher-order component to add validation to form fields
const withValidation = (WrappedComponent, validationConfig) => {
  return function ValidatedComponent(props) {
    const ValidationWrapper = ({ label, value, required, children }) => {
      return (
        <div className="flex items-start gap-2">
          <div className="flex-grow">
            {label && (
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {label}
                </span>
                <ValidationIndicator 
                  isValid={!required || (value !== undefined && value !== '')}
                  showIndicator={required}
                />
              </div>
            )}
            {children}
          </div>
        </div>
      );
    };

    return <WrappedComponent {...props} ValidationWrapper={ValidationWrapper} />;
  };
};

export { ValidationIndicator, useFormValidation, withValidation };