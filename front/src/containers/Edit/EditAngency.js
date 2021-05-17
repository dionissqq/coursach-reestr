import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Server from '../../utils/server';
import Form from '../../components/Form/Form';
import DefaultMessages from '../../utils/messages';
import { getCurrentUser } from '../../utils/auth';
import InformationForm from '../../components/informationForm/InformationForm';
import Agency from '../../utils/models/agency';
import * as moment from "moment";
import './edit.css'

const Messages = Object.assign ({}, DefaultMessages)

export default function EditAgency(props) {
    document.body.className = "background";
    document.title = "Редагувати інформаційне агенство";

    const id = props.match.params.id;

    const [entity, setEntity] = useState({
        isLoaded : false,
        data : {}
    });

    const [warning, setWarning] = useState(Messages.Loading);
    
    const [duplicate_exists, setDuplicateExists] = useState(false);

    const [formMessage, setFormMessage] = useState(Messages.Empty);

    function getFormProps() {
        let props = {
            inputs : [
                {
                    type : Form.InputType.Text,
                    props : {
                        required : true,
                        readOnly : true,
                        name : "id",
                        maxLength : "256",
                        placeholder : "Реєстраційний номер",
                        defaultValue : entity.data.id,
                        label: "Реєстраційний номер"
                    }
                },
                {
                    type : Form.InputType.Date,
                    props : {
                        required : true,
                        disabled : true,
                        name : "register_registration_date",
                        selected : new Date (entity.data.register_registration_date ? moment(entity.data.register_registration_date, 'DD/MM/YYYY') : moment()),
                        label: "Дата реєстрації у реєстрі"
                    },
                },
                {
                    type : Form.InputType.Date,
                    props : {
                        required : true,
                        name : "submission_date",
                        label : "Дата надходження документів",
                        defaultValue : entity.data.submission_date
                    }
                },
                {
                    type : Form.InputType.TextArea,
                    props : {
                        required : true,
                        name : "founders",
                        maxLength : "256",
                        placeholder : "Засновники (один на рядок)",
                        defaultValue : entity.data.founders
                    }
                },
                {
                    type : Form.InputType.Text,
                    props : {
                        required : true,
                        type : "text",
                        name : "name",
                        maxLength : "256",
                        placeholder : "Назва інформагенства",
                        defaultValue : entity.data.name
                    }
                },
                {
                    type : Form.InputType.TextArea,
                    props : {
                        required : true,
                        name : "doc_registration_unit",
                        maxLength : "256",
                        placeholder : "Орган, до якого надійшли документи на реєстрацію",
                        defaultValue : entity.data.doc_registration_unit
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
                        },
                        defaultValue : entity.data.type
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
                        },
                        defaultValue : entity.data.form
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
                        placeholder : "Мови розповсюдження інформпродукції",
                        defaultValue : entity.data.languages
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
                        },
                        defaultValue : entity.data.distribution_scope
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
                        placeholder : "Програмна мета",
                        defaultValue : entity.data.goals
                    }
                },
                {
                    type : Form.InputType.TextArea,
                    props : {
                        required : true,
                        type : "text",
                        name : "money_source",
                        maxLength : "256",
                        placeholder : "Джерела фінансового забезпечення",
                        defaultValue : entity.data.money_source
                    }
                },
                {
                    type : Form.InputType.Text,
                    props : {
                        required : true,
                        type : "text",
                        name : "legal_location",
                        maxLength : "256",
                        placeholder : "Місцезнаходження юридичної особи",
                        defaultValue : entity.data.legal_location
                    }
                },
                {
                    type : Form.InputType.TextArea,
                    props : {
                        required : true,
                        name : "legal_bank_acc",
                        maxLength : "256",
                        placeholder : "Банківські реквізити юридичної особи",
                        defaultValue : entity.data.legal_bank_acc
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
                        placeholder : "Ідентифікаційний код ЮО",
                        defaultValue : entity.data.legal_id
                    }
                },
                {
                    type : Form.InputType.Text,
                    props : {
                        required : true,
                        type : "text",
                        name : "location",
                        maxLength : "128",
                        placeholder : "Місцезнаходження інформагенства",
                        defaultValue : entity.data.location
                    }
                },
                {
                    type : Form.InputType.Text,
                    props : {
                        required : true,
                        type : "text",
                        name : "connection",
                        maxLength : "512",
                        placeholder : "Номери засобів зв'язку",
                        defaultValue : entity.data.connection
                    }
                },
                {
                    type : Form.InputType.Text,
                    props : {
                        required : true,
                        type : "text",
                        name : "certificate_number",
                        maxLength : "32",
                        placeholder : "Серія та номер свідоцтва",
                        defaultValue : entity.data.connection,
                        label: "Серія та номер свідоцтва"
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
                    type : Form.InputType.Text,
                    props : {
                        required : true,
                        type : "text",
                        name : "final_registration_unit",
                        maxLength : "32",
                        placeholder : "Орган, який здійснив державну реєстрацію",
                        defaultValue : entity.data.connection,
                        label: "Орган, який здійснив державну реєстрацію"
                    }
                },
                {
                    type : Form.InputType.Checkbox,
                    props : {
                        name : "reregistration",
                        label : "ЗМІ перереєстровано",
                        defaultValue : entity.data.reregistration
                    }
                },
                {
                    type : Form.InputType.Checkbox,
                    props : {
                        //disabled: entity.data.duplicate_date,
                        label : "Видано дублікат свідоцтва про держреєстрацію",
                        id : "duplicate_exists",
                        checked : duplicate_exists,
                        onClick : () => {
                            setDuplicateExists(!duplicate_exists)
                        }
                    }
                }
            ],
            cb : onSubmit,
            labels : {
                legend : "Редагувати інформагенство",
                message : formMessage
            }
        }
        if (duplicate_exists) {
            props.inputs = props.inputs.concat([
                {
                    type : Form.InputType.Text,
                    props : {
                        type : "text",
                        name : "duplicate_doc_name",
                        maxLength : "128",
                        placeholder : "Назва документу, що є підставою для видачі дупліката свідоцтва",
                        defaultValue : entity.data.duplicate_doc_name,
                    }
                },
                {
                    type : Form.InputType.Text,
                    props : {
                        type : "number",
                        name : "duplicate_doc_number",
                        maxLength : "16",
                        placeholder : "Номер документу, що є підставою для видачі дупліката свідоцтва",
                        defaultValue : entity.data.duplicate_doc_number
                    }
                },
                {
                    type : Form.InputType.Date,
                    props : {
                        name : "duplicate_doc_date",
                        selected : new Date (entity.data.duplicate_doc_date ? moment(entity.data.duplicate_doc_date, 'DD/MM/YYYY') : moment()),
                        label : "Дата документу, що є підставою для видачі дупліката свідоцтва"
                    }
                },
                {
                    type : Form.InputType.Text,
                    props : {
                        type : "text",
                        name : "duplicate_doc_issued",
                        maxLength : "128",
                        placeholder : "Ким видано документ, що є підставою для видачі дупліката свідоцтва",
                        defaultValue : entity.data.duplicate_doc_issued,
                    }
                },
                {
                    type : Form.InputType.Date,
                    props : {
                        required : true,
                        name : "duplicate_date",
                        label : "Дата видачі дупліката свідоцтва",
                        selected : new Date (entity.data.duplicate_date ? moment(entity.data.duplicate_date, 'DD/MM/YYYY') : moment()),
                    }
                },
                {
                    type : Form.InputType.Text,
                    props : {
                        type : "text",
                        name : "duplicate_doc_issued",
                        maxLength : "256",
                        placeholder : "Орган, яким було видано дуплікат свідоцтва",
                        defaultValue : entity.data.duplicate_doc_issued,
                    }
                }
            ])
        }
        props.inputs.push({
            type : Form.InputType.TextArea,
            props : {
                name : "additional",
                maxLength : "512",
                placeholder : "Додаткові відомості",
                defaultValue : entity.data.additional
            }
        })
        return props
    }

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
        setFormMessage({
            text : messageText,
            color : messageColor
        });
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
        
        Agency.save(form)
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
                    redirectURI: "/agency/" + resp.id
                })
                setFormInfo(Messages.Saved);
            })
    }
    const sessionUser = getCurrentUser();

    if (!sessionUser && warning === Messages.Empty)
        setWarning(Messages.Unauthorized(props.location.pathname));
    if (entity.isLoaded) {
        if (warning !== Messages.Empty)
            setWarning(Messages.Empty)
    } else 
        Agency.getById(id)
            .then(result => {
                if (result.error) {
                    switch (result.error) {
                        case Server.ErrorTypes.Unauthorized:
                            setWarning(Messages.Unauthorized(props.location.pathname))
                            break

                        case Server.ErrorTypes.ConnecionError:
                            setWarning(Messages.ConnectionError)
                            break

                        case Server.ErrorTypes.NotFound:
                            setWarning(Messages.NotFound)
                            break

                        default:
                            setWarning(Messages.ServerError)
                            break
                    }
                    return
                }
                setEntity({
                    isLoaded : true,
                    data : result.data
                });
                setWarning(Messages.Empty);
            })

    return (
        <div className="midMarginTop">
            {
                warning && warning !== "" ?
                <div className="center">
                    { warning }
                </div>
                :
                <React.Fragment>
                    <div className="editsid_certificate_button_outter">
                        <Link to = "certificate" className = {"no_link"} >
                            <div className="button light_shadow white_button">
                                Отримати сертифікат про реєстрацію інформагенства
                            </div>
                        </Link>
                    </div>
                    <div style={{marginBottom:"10vh"}}>
                        <Form {...getFormProps()}/>
                        {
                            infoFormData.message ? <InformationForm {...informationForm}/> : ''
                        }
                    </div>
                </React.Fragment>
            }
        </div>
    );
}