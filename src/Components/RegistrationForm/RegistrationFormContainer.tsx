import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userRegistration } from "../../store/actions/userActions";
import { AppDispatch, RootState } from "../../store/store";
import RegistrationForm from "./RegistrationForm";

const RegistrationFormContainer = () => {
    const dispatch = useDispatch<AppDispatch>();

    const [error, setError] = useState(null);

    const { loading } = useSelector((state: RootState) => state.userReducer);

    const onFinish = (values: any) => {
        setError(null);
        dispatch(
            userRegistration({
                nickName: values.nickName,
                firstName: values.firstName,
                secondName: values.secondName,
                email: values.email,
                password: values.password,
            })
        )
            .unwrap()
            .catch((rejectedValue) => {
                setError(rejectedValue.message);
            });
    };

    return (
        <RegistrationForm onFinish={onFinish} error={error} loading={loading} />
    );
};

export default RegistrationFormContainer;
