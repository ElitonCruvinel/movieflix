import { AxiosRequestConfig } from 'axios';
import { useForm } from 'react-hook-form';
import { Review } from 'type/review';
import { requestBackend } from 'util/requests';
import { toast } from 'react-toastify';

import './styles.css';

type Props = {
  movieId: string;
  onInsertReview: (review: Review) => void;
};

type FormData = {
  movieId: number;
  text: string;
};

const ReviewForm = ({ movieId, onInsertReview }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>();

  const onSubmit = (formData: FormData) => {
    formData.movieId = parseInt(movieId);

    const config: AxiosRequestConfig = {
      method: 'POST',
      url: '/reviews',
      data: formData,
      withCredentials: true,
    };

    requestBackend(config)
      .then((response) => {
        setValue('text', '');
        onInsertReview(response.data);
        toast.info('Avaliação salva com sucesso');
      })
      .catch((error) => {
        toast.error('Erro ao salvar a avaliação');
      });
  };

  return (
    <div>
      <div className="base-card review-form-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-container">
            <input
              {...register('text', {
                required: 'Campo obrigatório',
              })}
              type="text"
              name="text"
              placeholder="Deixe sua avaliação aqui"
            />
            <div>{errors.text?.message}</div>
          </div>
          <div className="btn-container">
            <button type="submit" className="btn btn-primary btn-submit">
              SALVAR AVALIAÇÃO
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
