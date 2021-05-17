import React, { useState } from 'react';

import Server from '../utils/server';
import Form from '../components/Form/Form';
import DefaultMessages from '../utils/messages';
import { getCurrentUser } from '../utils/auth';
import InformationForm from '../components/informationForm/InformationForm';
import * as moment from "moment";
import Agency from '../utils/models/agency';

const Messages = Object.assign ({}, DefaultMessages)

export default function NewAgency(props) {
    document.body.className = "background";
    document.title = "Нове інформаційне агенство";

    const [warning, setWarning] = useState(Messages.Empty);

    const [formProps, setFormProps] = useState ({
        inputs : [
            {
                type : Form.InputType.Date,
                props : {
                    required : true,
                    name : "submission_date",
                    label : "Дата надходження документів"
                }
            },
            {
                type : Form.InputType.TextArea,
                props : {
                    required : true,
                    name : "founders",
                    maxLength : "256",
                    placeholder : "Засновники (один на рядок)"
                }
            },
            {
                type : Form.InputType.Text,
                props : {
                    required : true,
                    type : "text",
                    name : "name",
                    maxLength : "256",
                    placeholder : "Назва інформагенства"
                }
            },
            {
                type : Form.InputType.TextArea,
                props : {
                    required : true,
                    name : "doc_registration_unit",
                    maxLength : "256",
                    placeholder : "Орган, до якого надійшли документи на реєстрацію"
                }
            },
            {
                type : Form.InputType.Selector,
                props : {
                    required : true,
                    name : "type",
                    className: "sth",
                    style: {
                        marginTop: "2vh"
                    }
                },
                disabledOption: "Вид інформагенства",
                options: [
                    {
                        value : "1",
                        name : "Державне"
                    },
                    {
                        value : "2",
                        name : "Недержавне"
                    }
                ]
            },
            {
                type : Form.InputType.Selector,
                props : {
                    required : true,
                    name : "form",
                    className: "sth",
                    style: {
                        marginTop: "2vh"
                    }
                },
                disabledOption: "Організаційно-правова форма інформагенства",
                options: [
                    {
                        value: "1",
                        name: "Фермерське господарство"
                    },
                    {
                        value: "2",
                        name: "Приватне підприємство"
                    },
                    {
                        value: "3",
                        name: "Колективне підприємство"
                    },
                    {
                        value: "4",
                        name: "Державне підприємство"
                    },
                    {
                        value: "5",
                        name: "Казенне підприємство"
                    },
                    {
                        value: "6",
                        name: "Комунальне підприємство"
                    },
                    {
                        value: "7",
                        name: "Дочірнє підприємство"
                    },
                    {
                        value: "8",
                        name: "Іноземне підприємство"
                    },
                    {
                        value: "9",
                        name: "Підприємство об’єднання громадян (релігійної організації, профспілки)"
                    },
                    {
                        value: "10",
                        name: "Підприємство споживчої кооперації"
                    },
                    {
                        value: "11",
                        name: "Орендне підприємство"
                    },
                    {
                        value: "12",
                        name: "Індивідуальне підприємство"
                    },
                    {
                        value: "13",
                        name: "Сімейне підприємство"
                    },
                    {
                        value: "14",
                        name: "Спільне підприємство"
                    },
                    {
                        value: "15",
                        name: "Господарські товариства"
                    },
                    {
                        value: "16",
                        name: "Акціонерне товариство"
                    },
                    {
                        value: "17",
                        name: "Відкрите акціонерне товариство"
                    },
                    {
                        value: "18",
                        name: "Закрите акціонерне товариство"
                    },
                    {
                        value: "19",
                        name: "Державна акціонерна компанія (товариство)"
                    },
                    {
                        value: "20",
                        name: "Товариство з обмеженою відповідальністю"
                    },
                    {
                        value: "21",
                        name: "Товариство з додатковою відповідальністю"
                    },
                    {
                        value: "22",
                        name: "Повне товариство"
                    },
                    {
                        value: "23",
                        name: "Командитне товариство"
                    },
                    {
                        value: "24",
                        name: "Адвокатське об’єднання"
                    },
                    {
                        value: "25",
                        name: "Адвокатське бюро"
                    },
                    {
                        value: "26",
                        name: "Кооперативи"
                    },
                    {
                        value: "27",
                        name: "Виробничий кооператив"
                    },
                    {
                        value: "28",
                        name: "Обслуговуючий кооператив"
                    },
                    {
                        value: "29",
                        name: "Житлово-будівельний кооператив"
                    },
                    {
                        value: "30",
                        name: "Гаражний кооператив"
                    },
                    {
                        value: "31",
                        name: "Споживчий кооператив"
                    },
                    {
                        value: "32",
                        name: "Сільськогосподарський виробничий кооператив"
                    },
                    {
                        value: "33",
                        name: "Сільськогосподарський обслуговуючий кооператив"
                    },
                    {
                        value: "34",
                        name: "Кооперативний банк"
                    },
                    {
                        value: "35",
                        name: "Організації (установи, заклади)"
                    },
                    {
                        value: "36",
                        name: "Орган державної влади"
                    },
                    {
                        value: "37",
                        name: "Судова система"
                    },
                    {
                        value: "38",
                        name: "Орган місцевого самоврядування"
                    },
                    {
                        value: "39",
                        name: "Державна організація (установа, заклад)"
                    },
                    {
                        value: "40",
                        name: "Комунальна організація (установа, заклад)"
                    },
                    {
                        value: "41",
                        name: "Приватна організація (установа, заклад)"
                    },
                    {
                        value: "42",
                        name: "Організація (установа, заклад) об’єднання громадян (релігійної організації, профспілки, споживчої кооперації тощо)"
                    },
                    {
                        value: "43",
                        name: "Організація орендарів"
                    },
                    {
                        value: "44",
                        name: "Організація покупців"
                    },
                    {
                        value: "45",
                        name: "Об’єднання підприємств (юридичних осіб)"
                    },
                    {
                        value: "46",
                        name: "Асоціація"
                    },
                    {
                        value: "47",
                        name: "Корпорація"
                    },
                    {
                        value: "48",
                        name: "Консорціум"
                    },
                    {
                        value: "49",
                        name: "Концерн"
                    },
                    {
                        value: "50",
                        name: "Холдингова компанія"
                    },
                    {
                        value: "51",
                        name: "Інші об’єднання юридичних осіб"
                    },
                    {
                        value: "52",
                        name: "Відокремлені підрозділи без статусу юридичної особи"
                    },
                    {
                        value: "53",
                        name: "Філія (інший відокремлений підрозділ)"
                    },
                    {
                        value: "54",
                        name: "Представництво"
                    },
                    {
                        value: "55",
                        name: "Непідприємницькі підприємства"
                    },
                    {
                        value: "56",
                        name: "Органи адвокатського самоврядування"
                    },
                    {
                        value: "57",
                        name: "Органи суддівського самоврядування"
                    },
                    {
                        value: "58",
                        name: "Вища кваліфікаційна комісія суддів України"
                    },
                    {
                        value: "59",
                        name: "Громадські об’єднання, профспілки, благодійні організації та інші подібні організації"
                    },
                    {
                        value: "60",
                        name: "Політична партія"
                    },
                    {
                        value: "61",
                        name: "Громадська організація"
                    },
                    {
                        value: "62",
                        name: "Громадська спілка"
                    },
                    {
                        value: "63",
                        name: "Релігійна організація"
                    },
                    {
                        value: "64",
                        name: "Профспілка"
                    },
                    {
                        value: "65",
                        name: "Об’єднання профспілок"
                    },
                    {
                        value: "66",
                        name: "Творча спілка (інша професійна організація)"
                    },
                    {
                        value: "67",
                        name: "Благодійна організація"
                    },
                    {
                        value: "68",
                        name: "Організація роботодавців"
                    },
                    {
                        value: "69",
                        name: "Об’єднання співвласників багатоквартирного будинку"
                    },
                    {
                        value: "70",
                        name: "Орган самоорганізації населення"
                    },
                    {
                        value: "71",
                        name: "Інші організаційно-правові форми"
                    },
                    {
                        value: "72",
                        name: "Підприємець – фізична особа"
                    },
                    {
                        value: "73",
                        name: "Товарна біржа"
                    },
                    {
                        value: "74",
                        name: "Фондова біржа"
                    },
                    {
                        value: "75",
                        name: "Кредитна спілка"
                    },
                    {
                        value: "76",
                        name: "Споживче товариство"
                    },
                    {
                        value: "77",
                        name: "Спілка споживчих товариств"
                    },
                    {
                        value: "78",
                        name: "Недержавний пенсійний фонд"
                    },
                    {
                        value: "79",
                        name: "Садівниче товариство"
                    },
                    {
                        value: "80",
                        name: "Інші організаційно-правові форми"
                    }
                ]
            },
            {
                type : Form.InputType.Text,
                props : {
                    required : true,
                    type : "text",
                    name : "languages",
                    maxLength : "256",
                    placeholder : "Мови розповсюдження інформпродукції"
                }
            },
            {
                type : Form.InputType.Selector,
                props : {
                    required : true,
                    name : "distribution_scope",
                    className: "sth",
                    style: {
                        marginTop: "2vh"
                    }
                },
                disabledOption: "Сфера розповсюдження",
                options: [
                    {
                        value : "1",
                        name : "Місцева"
                    },
                    {
                        value : "2",
                        name : "Регіональна"
                    },
                    {
                        value : "3",
                        name : "Національна"
                    },
                    {
                        value : "4",
                        name : "Національна та зарубіжна"
                    },
                    {
                        value : "5",
                        name : "Зарубіжна"
                    }
                ]
            },
            {
                type : Form.InputType.TextArea,
                props : {
                    required : true,
                    type : "text",
                    name : "goals",
                    maxLength : "512",
                    placeholder : "Програмна мета"
                }
            },
            {
                type : Form.InputType.TextArea,
                props : {
                    required : true,
                    type : "text",
                    name : "money_source",
                    maxLength : "256",
                    placeholder : "Джерела фінансового забезпечення"
                }
            },
            {
                type : Form.InputType.Text,
                props : {
                    required : true,
                    type : "text",
                    name : "legal_location",
                    maxLength : "256",
                    placeholder : "Місцезнаходження юридичної особи"
                }
            },
            {
                type : Form.InputType.TextArea,
                props : {
                    required : true,
                    name : "legal_bank_acc",
                    maxLength : "256",
                    placeholder : "Банківські реквізити юридичної особи"
                }
            },
            {
                type : Form.InputType.Text,
                props : {
                    required : true,
                    type : "number",
                    name : "legal_id",
                    maxLength : "32",
                    min : "10000000",
                    max : "99999999",
                    placeholder : "Ідентифікаційний код ЮО"
                }
            },
            {
                type : Form.InputType.Text,
                props : {
                    required : true,
                    type : "text",
                    name : "location",
                    maxLength : "128",
                    placeholder : "Місцезнаходження інформагенства"
                }
            },
            {
                type : Form.InputType.Text,
                props : {
                    required : true,
                    type : "text",
                    name : "connection",
                    maxLength : "512",
                    placeholder : "Номери засобів зв'язку"
                }
            },
            {
                type : Form.InputType.Date,
                props : {
                    required : true,
                    name : "gov_reg_date",
                    label : "Дата державної реєстрації"
                }
            },
            {
                type : Form.InputType.Checkbox,
                props : {
                    type : "text",
                    name : "reregistration",
                    label : "ЗМІ перереєстровано"
                }
            },
            {
                type : Form.InputType.TextArea,
                props : {
                    name : "additional",
                    maxLength : "512",
                    placeholder : "Додаткові відомості"
                }
            },
        ],
        cb : onSubmit,
        labels : {
            legend : "Нове інформагенство"
        }
    });

    const [infoFormData, setInfoFormData] = useState({
        message : Messages.Empty,
        redirectURI : ""
    });

    const informationForm = {
        message : infoFormData.message,
        onClick : () => {
            if (infoFormData.redirectURI !== Messages.Empty)
                setWarning(Messages.Redirect(infoFormData.redirectURI))
            else
                setInfoFormData({
                    message: Messages.Empty,
                    redirectURI : ""
                })
        }
    };

    function setFormInfo(messageText, messageColor = Form.MessageColor.Default) {
        const props = Object.assign({}, formProps);
        props.labels.message = {
            text : messageText,
            color : messageColor
        };
        setFormProps(props);
    }

    function setSubmitButtonFaded(faded) {
        if (faded) {
            document.getElementById('submit_button').style.opacity = 0.5;
            document.getElementById('submit_button').style["pointer-events"] = 'none';
        } else {
            document.getElementById('submit_button').style.opacity = 1;
            document.getElementById('submit_button').style["pointer-events"] = 'auto';
        }
    }

    async function onSubmit(form) {

        setFormInfo(Messages.Empty);
        setSubmitButtonFaded(true);

        const formData = new FormData(form);

        if (!formData.get("type")) {
            setInfoFormData({
                message: "Оберіть тип інформагенства!",
                redirectURI: ""
            })
            setSubmitButtonFaded(false);
            return
        }

        if (!formData.get("form")) {
            setInfoFormData({
                message: "Оберіть організаційно-правову форму інформагенства!",
                redirectURI: ""
            })
            setSubmitButtonFaded(false);
            return
        }

        if (!formData.get("distribution_scope")) {
            setInfoFormData({
                message: "Оберіть cферу розповсюдження інформагенства!",
                redirectURI: ""
            })
            setSubmitButtonFaded(false);
            return
        }

        if (new Date(moment(formData.get("submission_date"), 'DD/MM/YYYY')) > Date.now()){
            setInfoFormData({
                message: "Дата надходження документів не може бути майбутньою!",
                redirectURI: ""
            })
            setSubmitButtonFaded(false);
            return
        }

        if (new Date(moment(formData.get("gov_reg_date"), 'DD/MM/YYYY')) > Date.now()){
            setInfoFormData({
                message: "Дата державної реєстрації не може бути майбутньою!",
                redirectURI: ""
            })
            setSubmitButtonFaded(false);
            return
        }

        var toSend = {};
        formData.forEach((value, key) => toSend[key] = value);
        Agency.save(toSend)
            .then((result) => {
                setSubmitButtonFaded(false);
                if (result.error) {
                    switch (result.error) {
                        case Server.ErrorTypes.Unauthorized:
                            setWarning(Messages.Unauthorized(props.location.pathname))
                            return

                        case Server.ErrorTypes.ConnecionError:
                            setInfoFormData({
                                message: Messages.ConnecionError,
                                redirectURI: ""
                            })
                            return

                        case Server.ErrorTypes.NotAcceptable:
                            setInfoFormData({
                                message: "Запит на створення сутності не може бути опрацьованим: було надано некоректні дані.",
                                redirectURI: ""
                            })
                            return

                        default:
                            setInfoFormData({
                                message: Messages.ServerError,
                                redirectURI: ""
                            })
                            return
                    }
                }
                const resp = result.data
                setInfoFormData({
                    message: Messages.Saved,
                    redirectURI: "/agencies/" + resp.id
                })
                setFormInfo(Messages.Saved);
            })
    }
    const sessionUser = getCurrentUser();

    if (!sessionUser && warning === Messages.Empty)
        setWarning(Messages.Unauthorized(props.location.pathname));

    return (
        <div className="midMarginTop">
            {
                (warning && warning !== "") ?
                    warning
                :
                <div style={{marginBottom:"10vh"}}>
                    <Form {...formProps}/>
                    {
                        infoFormData.message ? <InformationForm {...informationForm}/> : ''
                    }
                </div>
            }
        </div>
    );
}