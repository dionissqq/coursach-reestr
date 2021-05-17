import React, { useState } from 'react';
import * as moment from "moment";

import Server from '../utils/server';
import Form from '../components/Form/Form';
import DefaultMessages from '../utils/messages';
import InformationForm from '../components/informationForm/InformationForm';
import Media from '../utils/models/media';

const Messages = Object.assign ({}, DefaultMessages)

export default function NewMedia(props) {
    document.body.className = "background";
    document.title = "Новий ЗМІ";

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
                    placeholder : "Назва видання"
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
                disabledOption: "Тип ЗМІ",
                options: [
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
                ]
            },
            {
                type : Form.InputType.Text,
                props : {
                    required : true,
                    type : "text",
                    name : "languages",
                    maxLength : "256",
                    placeholder : "Мови видання"
                }
            },
            {
                type : Form.InputType.Selector,
                props : {
                    required : true,
                    name : "distribution_zone",
                    className: "sth",
                    style: {
                        marginTop: "2vh"
                    }
                },
                disabledOption: "Сфера розповсюдження",
                options: [
                    {
                        value : "0",
                        name : "Місцева"
                    },
                    {
                        value : "1",
                        name : "Регіональна"
                    },
                    {
                        value : "2",
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
                    placeholder : "Програмні цілі або тематична спрямованість"
                }
            },
            {
                type : Form.InputType.Text,
                props : {
                    required : true,
                    type : "text",
                    name : "publication_frequency",
                    maxLength : "32",
                    placeholder : "Періодичність випуску"
                }
            },
            {
                type : Form.InputType.Text,
                props : {
                    required : true,
                    type : "text",
                    name : "volume",
                    maxLength : "32",
                    placeholder : "Обсяг видання"
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
                type : Form.InputType.Selector,
                props : {
                    required : true,
                    name : "status",
                    className: "sth",
                    style: {
                        marginTop: "2vh"
                    }
                },
                disabledOption: "Статус видання",
                options: [
                    {
                        value : "0",
                        name : "Вітчизняне"
                    },
                    {
                        value : "1",
                        name : "Спільне"
                    }
                ]
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
                    name : "editorial_location",
                    maxLength : "128",
                    placeholder : "Місцезнаходження редакції"
                }
            },
            {
                type : Form.InputType.Selector,
                props : {
                    required : true,
                    name : "type_by_purpose",
                    className: "sth",
                    style: {
                        marginTop: "2vh"
                    }
                },
                disabledOption: "Вид видання",
                options: [
                    {
                        value : "0",
                        name : "загальнополітичне"
                    },
                    {
                        value : "1",
                        name : "громадсько-політичне"
                    },
                    {
                        value : "2",
                        name : "з питань економіки і бізнесу"
                    },
                    {
                        value : "3",
                        name : "виробничо-практичне"
                    },
                    {
                        value : "4",
                        name : "наукове"
                    },
                    {
                        value : "5",
                        name : "науково-виробниче"
                    },
                    {
                        value : "6",
                        name : "науково-популярне"
                    },
                    {
                        value : "7",
                        name : "навчальне"
                    },
                    {
                        value : "8",
                        name : "довідкове"
                    },
                    {
                        value : "9",
                        name : "навчальне"
                    },
                    {
                        value : "10",
                        name : "літературно-художнє"
                    },
                    {
                        value : "11",
                        name : "з питань мистецтва"
                    },
                    {
                        value : "12",
                        name : "спортивне"
                    },
                    {
                        value : "13",
                        name : "юридичне"
                    },
                    {
                        value : "14",
                        name : "еротичне"
                    },
                    {
                        value : "15",
                        name : "для дозвілля"
                    },
                    {
                        value : "16",
                        name : "медичне"
                    },
                    {
                        value : "17",
                        name : "релігійне"
                    },
                    {
                        value : "18",
                        name : "уфологічне"
                    },
                    {
                        value : "19",
                        name : "екологічне"
                    },
                    {
                        value : "20",
                        name : "туристичне"
                    },
                    {
                        value : "20",
                        name : "рекламне"
                    },
                    {
                        value : "20",
                        name : "інформаційне"
                    },
                    {
                        value : "21",
                        name : "для дітей"
                    },
                    {
                        value : "22",
                        name : "інше"
                    }
                ]
            },
            {
                type : Form.InputType.Selector,
                props : {
                    required : true,
                    name : "readers_category",
                    className: "sth",
                    style: {
                        marginTop: "2vh"
                    }
                },
                disabledOption: "Категорія читачів",
                options: [
                    {
                        value : "0",
                        name : "усе населення"
                    },
                    {
                        value : "1",
                        name : "дорослі"
                    },
                    {
                        value : "2",
                        name : "молодь"
                    },
                    {
                        value : "3",
                        name : "діти"
                    },
                    {
                        value : "4",
                        name : "чоловіки"
                    },
                    {
                        value : "5",
                        name : "жінки"
                    },
                    {
                        value : "5",
                        name : "особи з інвалідністю"
                    },
                    {
                        value : "6",
                        name : "студенти"
                    },
                    {
                        value : "7",
                        name : "працівники певної галузі"
                    },
                    {
                        value : "8",
                        name : "науковці"
                    },
                    {
                        value : "9",
                        name : "інше"
                    }
                ]
            },
            // {
            //     type : Form.InputType.TextArea,
            //     props : {
            //         required : true,
            //         type : "text",
            //         name : "final_registration_unit",
            //         maxLength : "256",
            //         placeholder : "Орган, який здійснив державну реєстрацію Друкованого ЗМІ"
            //     }
            // },
            {
                type : Form.InputType.Checkbox,
                props : {
                    type : "text",
                    name : "reregistration",
                    maxLength : "256",
                    label : "ЗМІ перереєстровано"
                }
            },
            {
                type : Form.InputType.Date,
                props : {
                    required : true,
                    name : "control_copy_date",
                    label : "Дата надходження контрольного примірника"
                }
            },
            {
                type : Form.InputType.Date,
                props : {
                    required : true,
                    name : "expiration_date",
                    label : "Дата втрати чинності свідоцтва про реєстрацію"
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
            legend : "Новий ЗМІ"
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
                message: "Оберіть тип ЗМІ!",
                redirectURI: ""
            })
            setSubmitButtonFaded(false);
            return
        }

        if (!formData.get("status")) {
            setInfoFormData({
                message: "Оберіть статус видання!",
                redirectURI: ""
            })
            setSubmitButtonFaded(false);
            return
        }

        if (!formData.get("type_by_purpose")) {
            setInfoFormData({
                message: "Оберіть вид видання!",
                redirectURI: ""
            })
            setSubmitButtonFaded(false);
            return
        }

        if (!formData.get("readers_category")) {
            setInfoFormData({
                message: "Оберіть категорію читачів видання!",
                redirectURI: ""
            })
            setSubmitButtonFaded(false);
            return
        }

        if (!formData.get("distribution_zone")) {
            setInfoFormData({
                message: "Оберіть сферу розповсюдження ЗМІ!",
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

        if (new Date(moment(formData.get("expiration_date"), 'DD/MM/YYYY')) > Date.now()){
            setInfoFormData({
                message: "Дата втрати чинності свідоцтва про реєстрацію не може бути минулою!",
                redirectURI: ""
            })
            setSubmitButtonFaded(false);
            return
        }

        if (new Date(moment(formData.get("control_copy_date"), 'DD/MM/YYYY')) > Date.now()){
            setInfoFormData({
                message: "Дата втрати чинності свідоцтва про реєстрацію не може бути майбутньою!",
                redirectURI: ""
            })
            setSubmitButtonFaded(false);
            return
        }
        
        var toSend = {};
        formData.forEach((value, key) => toSend[key] = value);
        Media.save(toSend)
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
                    redirectURI: "/media/" + resp.id
                })
                setFormInfo(Messages.Saved);
            })
    }

    return (
        <div className="midMarginTop">
            {
                (warning && warning !== "") ?
                    warning
                :
                <div style={{marginBottom:"10vh"}}>
                    <Form {...formProps}/>
                    {
                        infoFormData.message ?
                            <InformationForm {...informationForm}/>
                        : ''
                    }
                </div>
            }
        </div>
    );
}