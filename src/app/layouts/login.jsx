import React, { useState } from "react";
import TextField from "../components/textField";

const Login = () => {
    const [data, setData] = useState({ email: "", password: "" });
    // чтобы контролировать несколько полей, можно создать для каждого useState, но это не оптимально
    // const [password, setPassword] = useState("");
    // const handleChange = (e) => {
    //     setEmail(e.target.value);
    //     // console.log(e.target.value, "changed");
    // };
    const handleChange = ({ target }) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
        console.log(target.name, target.value);
    };
    const handleSubmit = (e) => {
        // отменяем обновление страницы (действие по умолчанию) при нажатии кнопки
        e.preventDefault();
        // console.log(e); // -> target -> action: "http://localhost:3000/login" - то, что отменили с пом. preventDefault()
        console.log(data); // вернет объект со значениями из формы
        // !!!!! есть нюанс - может сработать submit до того, как мы получим все значения из полей
    };

    return (
        // доступ к значениям полей получаем через атрибут value или onChange
        // value - то значение, которое передаем в поле
        // onChange - даные об изменении содержания поля
        // контролируемое поле в Реакт - когда в нем есть value и onChange
        // Неконтролируемое - без них
        <form onSubmit={handleSubmit}>
            <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                onChange={handleChange}
            />
            <TextField
                label="Пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
            />
            {/* кнопке необязательно добавлять type:"submit", т.к. он у всех кнопок в форме по дефолту
            если кнапка не submit, ей необходимо добавить type:"button" */}
            <button type="submit">Submit</button>
            {/* <div>
                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                />
            </div> */}
            {/* <div>
                <div>
                    <label htmlFor="radio1">Radio 1</label>
                    <input type="radio" id="radio1" name="radio" />
                </div>
                <div>
                    <label htmlFor="radio2">Radio 2</label>
                    <input type="radio" id="radio2" name="radio" />
                </div>
            </div> */}
        </form>
    );
};

export default Login;
