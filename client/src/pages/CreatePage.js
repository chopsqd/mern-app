import React, {useContext, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {useEffect} from "react";
import {AuthContext} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";

export const CreatePage = () => {
    const navigate = useNavigate()
    const {request} = useHttp()
    const auth = useContext(AuthContext)
    const [link, setLink] = useState('')

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const pressHandler = async event => {
        if(event.key === 'Enter') {
            try {
                const data = await request('/api/link/generate', 'POST', {from: link}, {
                    Authorization: `Bearer ${auth.token}`
                })
                navigate(`/detail/${data.link._id}`)
            } catch(e) {
                console.log('Error: ', e)
            }
        }
    }

    return (
        <div className={"row"}>
            <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
                <div className="input-field">
                    <input
                        id="link"
                        type="text"
                        value={link}
                        placeholder={"https://yourlink.com"}
                        onChange={e => setLink(e.target.value)}
                        onKeyPress={pressHandler}
                    />
                    <label htmlFor="link">Введите ссылку</label>
                </div>
            </div>
        </div>
    );
};