import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { SignInContainer } from '../../components/SignIn';

describe('SignIn', () => {
    describe('SignInContainer', () => {
        it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
            const credentials = {
                username: 'kalle',
                password: 'password',
            };
            const mocker = jest.fn();
            const { getByTestId } = render(<SignInContainer onSubmit={mocker} />);
            fireEvent.changeText(getByTestId('signInUsername'), credentials.username);
            fireEvent.changeText(getByTestId('signInPassword'), credentials.password);
            fireEvent.press(getByTestId('signInSubmit'));
            await waitFor(() => {
                expect(mocker).toHaveBeenCalledTimes(1);
                const result = mocker.mock.calls[0][0];
                expect(result).toEqual(credentials);
            });
        });
    });
});