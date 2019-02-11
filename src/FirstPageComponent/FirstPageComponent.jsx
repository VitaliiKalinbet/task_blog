import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from "prop-types";
import style from './FirstPageComponent.module.css';

const FirstPageComponent = ({ hanndleChangeInput, value }) => {
    return (
        <div className={style.first_page_container}>
            <h2>Our blog</h2>
            <p>* to see the articles, click on the button</p>
            <p>** enter your name if desired (so that your articles have an author)</p>

            <form className={style.form}>
                <input value={value} onChange={hanndleChangeInput} className={style.input} type="text" placeholder="Enter your name" />
                <NavLink to='/posts'>
                    <button type='submit' className={style.button}>
                        Show blog
                    </button>
                </NavLink>
            </form>
        </div>
    );
};

FirstPageComponent.protoTypes = {
    hanndleChangeInput: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
};

export default FirstPageComponent;