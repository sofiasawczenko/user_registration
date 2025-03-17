import { useState } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import styles from './Form.module.scss';

function Form() {
  const [data, setData] = useLocalStorage('data', []);
  const [formData, setFormData] = useState({ name: '', email: '', cpf: '', telefone: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Função para formatar CPF
  const formatCPF = (value) => {
    value = value.replace(/\D/g, ''); // Remove tudo o que não for número
    if (value.length <= 3) {
      return value;
    } else if (value.length <= 6) {
      return value.replace(/(\d{3})(\d{1,})/, '$1.$2');
    } else if (value.length <= 9) {
      return value.replace(/(\d{3})(\d{3})(\d{1,})/, '$1.$2.$3');
    } else {
      return value.replace(/(\d{3})(\d{3})(\d{3})(\d{1,})/, '$1.$2.$3-$4');
    }
  };

  // Função para formatar Telefone
  const formatTelefone = (value) => {
    value = value.replace(/\D/g, ''); // Remove tudo o que não for número
    if (value.length <= 2) {
      return value;
    } else if (value.length <= 6) {
      return value.replace(/^(\d{2})(\d{1,})/, '($1) $2');
    } else if (value.length <= 10) {
      return value.replace(/^(\d{2})(\d{5})(\d{1,})/, '($1) $2-$3');
    } else {
      return value.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
  };

  /// Validação de campos corrigida
const validateField = (name, value) => {
  let errorMessage = '';
  const rawValue = value.replace(/\D/g, ''); // Remove caracteres não numéricos

  if (name === 'name' && value.length < 3) {
    errorMessage = 'O nome deve ter pelo menos 3 caracteres.';
  } else if (name === 'email' && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
    errorMessage = 'Por favor, insira um e-mail válido. Exemplo: usuario@dominio.com';
  } else if (name === 'cpf' && !/^\d{11}$/.test(rawValue)) {
    errorMessage = 'CPF inválido. Deve conter 11 números.';
  } else if (name === 'telefone' && !/^\d{10,11}$/.test(rawValue)) {
    errorMessage = 'O telefone deve conter 10 ou 11 dígitos.';
  }

  return errorMessage;
};


  // Tratamento de mudança nos campos
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'cpf') {
      setFormData({ ...formData, cpf: formatCPF(value) });
    } else if (name === 'telefone') {
      setFormData({ ...formData, telefone: formatTelefone(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  // Validação no evento de blur
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  // Submissão do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    let validationErrors = {};
    let isValid = true;

    Object.keys(formData).forEach((key) => {
      const errorMessage = validateField(key, formData[key]);
      if (errorMessage) {
        validationErrors[key] = errorMessage;
        isValid = false;
      }
    });

    if (isValid) {
      setTimeout(() => {
        setData([...data, { ...formData, id: Date.now() }]);
        setFormData({ name: '', email: '', cpf: '', telefone: '' });
        setLoading(false);
      }, 2000);
    } else {
      setLoading(false);
    }

    setErrors(validationErrors);
  };

  // Verifica se o formulário é válido
  const isFormValid = Object.values(formData).every((value) => value.trim() !== '') &&
                      Object.values(errors).every((error) => !error);

  return (
    <div className="d-flex vh-100 vw-100">
      <div className="flex-grow-1 d-flex justify-content-center align-items-center">
        <div className="w-75">
          <h1 className={styles.title}>Cadastrar<br /> Usuário</h1>
          <h2 className={styles.subtitle}>Preencha os campos abaixo para cadastrar um novo usuário.</h2>
          <hr className={styles.dashedHr} />
          <form onSubmit={handleSubmit} className={`row g-3 mb-5 ${styles.formText}`}>
            {[
              { name: 'name', label: 'Nome completo (sem abreviações)' },
              { name: 'email', label: 'E-mail' },
              { name: 'cpf', label: 'CPF' },
              { name: 'telefone', label: 'Telefone' },
            ].map((field, index) => (
              <div key={index} className="col-md-6">
                <div className="form-floating">
                  <input
                    type={field.name === 'email' ? 'email' : 'text'}
                    className={`form-control border-0 shadow-none ${errors[field.name] ? 'is-invalid' : ''}`}
                    id={`floating${field.name}`}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={field.label}
                    required
                  />
                  <label htmlFor={`floating${field.name}`}>
                    {field.label} <span className="text-danger">*</span>
                  </label>
                  {errors[field.name] && <div className="text-danger">{errors[field.name]}</div>}
                </div>
              </div>
            ))}
            <div className="d-flex justify-content-end mt-4">
              <button
                type="submit"
                className={`${styles.btnsubmit} ${loading ? styles.loading : ''}`}
                disabled={!isFormValid || loading}
              >
                {loading ? (
                  <div className={styles.loader}></div> 
                ) : (
                  'Cadastrar'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="d-none d-md-block">
        <img src="src/assets/images/greetings.png" alt="Tinnova Logo" className={styles.img} />
      </div>
    </div>
  );
}

export default Form;
