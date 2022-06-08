import React from 'react'
import { useEffect } from 'react'
import { history, useModel } from 'umi';


export default () => {
    const { initialState, setInitialState } = useModel('@@initialState');

    useEffect(() => {
        history.replace({
            pathname: '/login'
        });
        setInitialState((s) => ({ ...s, currentUser: undefined }));
        sessionStorage.removeItem('sid')
    }, [])
    return (
        <></>
    )
}
