import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { CREATE_REVIEW } from '../graphql/mutations';
import { useHistory } from 'react-router-native';
import { useMutation } from '@apollo/react-hooks';
import Form from './Form';

const formFields = [
  { name: 'repositoryOwner', placeholder: 'Repository owner' },
  { name: 'repositoryName', placeholder: 'Repository name'},
  { name: 'rating', placeholder: 'Rating (0-100)'},
  { name: 'review', placeholder: 'Review', props: { multiline: true } },
];

const ReviewForm = ({ onSubmit }) => {
  return <Form fields={formFields} submit={[onSubmit,'Create a review']}/>;
};

const initialValues = {
  repositoryOwner: '',
  repositoryName: '',
  rating: '',
  review: '',
};

const validationSchema = yup.object().shape({
  repositoryOwner: yup.string().required('Repository owner is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup.number().required('Rating is required').typeError('Rating must be a number').min(0, 'Rating must be higher than ${min}').max(100, 'Rating must be lower than ${max}'),
  review: yup.string().notRequired().ensure(),
});

const Review = () => {
  const history = useHistory();
  const [createReview] = useMutation(CREATE_REVIEW);
  const onSubmit = async (values) => {
    const { repositoryOwner, repositoryName, rating, review } = values;
    try {
      const {data} = await createReview({ variables: { review: { ownerName: repositoryOwner, repositoryName, rating: parseInt(rating), text: review } } });
      history.push(`/${data.createReview.repositoryId}`);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default Review;