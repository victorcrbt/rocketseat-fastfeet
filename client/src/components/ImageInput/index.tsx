import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  ChangeEvent,
} from 'react';
import { MdImage } from 'react-icons/md';
import { useField } from '@unform/core';
import * as yup from 'yup';
import path from 'path';

import { Container } from './styles';

interface Props {
  name: string;
}

interface Validation {
  file: Blob;
}

type InputProps = JSX.IntrinsicElements['input'] & Props;

const allowedExtensions = ['.png', '.jpg'];

const schema: yup.Schema<Validation> = yup.object().shape({
  file: yup.mixed().test('checkType', 'Formato de arquivo inválido.', type => {
    if (!allowedExtensions.includes(path.extname(type.name))) {
      return false;
    }

    return true;
  }),
});

const ImageInput: React.FC<InputProps> = ({ name, className, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    fieldName,
    registerField,
    defaultValue,
    error: unformError,
  } = useField(name);
  const [preview, setPreview] = useState(defaultValue);
  const [error, setError] = useState(unformError);

  const handlePreview = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      setPreview('');
      setError('');
      const file = e.target.files?.[0];

      try {
        await schema.validate({ file });

        const previewURL = URL.createObjectURL(file);
        setPreview(previewURL);
      } catch (err) {
        setError(err.message);
      }
    },
    []
  );

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'files[0]',
      clearValue(ref: HTMLInputElement) {
        ref.value = '';
        setPreview(null);
      },
      setValue(_: HTMLInputElement, value: string) {
        setPreview(value);
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container error={error}>
      {/* eslint-disable jsx-a11y/label-has-associated-control */}
      <label htmlFor={name}>
        <div className={`preview ${className}`}>
          {preview ? (
            <img src={preview} alt="Upload" />
          ) : (
            <div>
              <MdImage size={24} />
              Adicionar foto
            </div>
          )}
        </div>
      </label>
      {/* eslint-disable jsx-a11y/label-has-associated-control */}

      <input
        ref={inputRef}
        defaultValue={defaultValue}
        type="file"
        name={name}
        id={name}
        onChange={handlePreview}
        accept="image/jpg, image/png"
      />

      {error && <span className="error">{error}</span>}
    </Container>
  );
};

export default ImageInput;
