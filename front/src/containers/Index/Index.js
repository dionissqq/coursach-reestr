import React, { useState } from 'react';

import './index.css';
import Messages from '../../utils/messages';
import Form from '../../components/Form/Form';

export default function Index () {
    document.body.className = "background";
    document.title = "Реєстр";
    
    const [warning, setWarning] = useState(Messages.Empty);

    function onSubmit(form) {
        const formData = new FormData(form);
        const bodyData = new URLSearchParams(formData);

        const kind = bodyData.get("kind");
        const type = bodyData.get("type");

        if (!kind) {
            alert("Оберіть вид СІД!")
            return
        }

        if (!type) {
            alert("Оберіть тип СІД!")
            return
        }

        const name = bodyData.get("name")

        setWarning(Messages.Redirect(`/search?name=${name}&kind=${kind}&type=${type}`));
    }

    const [typeSelectorOptions, setTypeSelectorOptions] = useState([]);
    
    function getFormProps(){
        return {
            inputs : [
                {
                    type : Form.InputType.Text,
                    props : {
                        required : true,
                        type : "text",
                        name : "name",
                        maxLength : "32",
                        placeholder : "Введіть назву СІД"
                    }
                },
                {
                    type : Form.InputType.Multiple,
                    outterProps: {
                        className: "selectorBox",
                    },
                    inputs : [
                        {
                            type : Form.InputType.Selector,
                            props : {
                                required : true,
                                name : "kind",
                                className: "sth",
                                onChange: (event) => {
                                    if (event.target.value === "media")
                                        setTypeSelectorOptions ([
                                            {
                                                value : "0",
                                                name : "Усі"
                                            },
                                            {
                                                value : "1",
                                                name : "Альманах"
                                            },
                                            {
                                                value : "2",
                                                name : "Бюлетень"
                                            },
                                            {
                                                value : "3",
                                                name : "Газета"
                                            },
                                            {
                                                value : "4",
                                                name : "Дайджест"
                                            },
                                            {
                                                value : "5",
                                                name : "Журнал"
                                            },
                                            {
                                                value : "6",
                                                name : "Збірник"
                                            },
                                            {
                                                value : "7",
                                                name : "Каталог"
                                            },
                                            {
                                                value : "8",
                                                name : "Інший"
                                            }
                                        ])
                                    else
                                        setTypeSelectorOptions([
                                            {
                                                value : "0",
                                                name : "Усі"
                                            },
                                            {
                                                value : "1",
                                                name : "Державне агенство"
                                            },
                                            {
                                                value : "2",
                                                name : "Недержавне агенство"
                                            }
                                        ]);
                                }
                            },
                            disabledOption: "Вид СІД",
                            options: [
                                {
                                    value : "media",
                                    name : "ЗМІ"
                                },
                                {
                                    value : "agencies",
                                    name : "Інформаційні агенства"
                                }
                            ]
                        },
                        {
                            type : Form.InputType.Selector,
                            props : {
                                required : true,
                                name : "type",
                                className: "sth"
                            },
                            disabledOption: typeSelectorOptions.length === 0 ? "Спочатку оберіть вид СІД" : "Тип СІД",
                            options: typeSelectorOptions
                        }
                    ]
                }
            ],
            cb : onSubmit,
            labels : {
                legend: "Пошук СІД"
            }
        };
    }

    return (
        <div id="main_box">
            {
                warning ?
                <p id="welcome_label">
                    { warning }
                </p>
                :
                <React.Fragment>
                    <p id="welcome_label">
                        Ласкаво просимо
                    </p>
                    <p className="emphasized" id="main_logo">
                        Державний реєстр друкованих засобів масової інформації  та інформаційних агентств як суб'єктів інформаційної діяльності
                    </p>
                    <br />
                    <Form {...getFormProps()}/>
                </React.Fragment>
            }
        </div>
    );
}