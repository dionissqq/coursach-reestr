import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Server from '../../utils/server';
import Form from '../../components/Form/Form';
import DefaultMessages from '../../utils/messages';
import { getCurrentUser } from '../../utils/auth';
import InformationForm from '../../components/informationForm/InformationForm';
import Media from '../../utils/models/media';
import * as moment from "moment";
import './edit.css'

const Messages = Object.assign ({}, DefaultMessages)

export default function EditMedia(props) {
    document.body.className = "background";
    document.title = "Редагувати ЗМІ";

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
                        placeholder : "Назва ЗМІ",
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
                        placeholder : "Мови видання",
                        defaultValue : entity.data.languages
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
                        },
                        defaultValue : entity.data.distribution_zone
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
                        placeholder : "Програмні цілі або тематична спрямованість",
                        defaultValue : entity.data.goals
                    }
                },
                {
                    type : Form.InputType.Text,
                    props : {
                        required : true,
                        type : "text",
                        name : "publication_frequency",
                        maxLength : "32",
                        placeholder : "Періодичність випуску",
                        defaultValue : entity.data.publication_frequency
                    }
                },
                {
                    type : Form.InputType.Text,
                    props : {
                        required : true,
                        type : "text",
                        name : "volume",
                        maxLength : "32",
                        placeholder : "Обсяг видання",
                        defaultValue : entity.data.volume
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
                    type : Form.InputType.Selector,
                    props : {
                        required : true,
                        name : "status",
                        className: "sth",
                        style: {
                            marginTop: "2vh"
                        },
                        defaultValue : entity.data.status
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
                        name : "editorial_location",
                        maxLength : "128",
                        placeholder : "Місцезнаходження редакції",
                        defaultValue : entity.data.location
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
                        },
                        defaultValue : entity.data.type_by_purpose
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
                        },
                        defaultValue : entity.data.readers_category
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
        props.inputs.concat([
            {
                type : Form.InputType.Date,
                props : {
                    name : "control_copy_date",
                    label : "Дата надходження контрольного примірника",
                    selected : new Date (entity.data.control_copy_date ? moment(entity.data.control_copy_date, 'DD/MM/YYYY') : moment()),
                }
            },
            {
                type : Form.InputType.Date,
                props : {
                    name : "removal_date",
                    label : "Дата вилучення з Реєстру",
                    selected : new Date (entity.data.removal_date ? moment(entity.data.removal_date, 'DD/MM/YYYY') : moment()),
                }
            },
            ///TODO
            {
                type : Form.InputType.TextArea,
                props : {
                    name : "additional",
                    maxLength : "512",
                    placeholder : "Додаткові відомості",
                    defaultValue : entity.data.additional
                }
            }
        ])
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

        const formDate = formData.get("submission_date").split('')
        const date = new Date(parseInt(formDate[6] + formDate[7] + formDate[8] + formDate[9]), parseInt(formDate[3] + formDate[4]) - 1, parseInt(formDate[0] + formDate[1]))
        if (date > Date.now()){
            setInfoFormData({
                message: "Дата надходження документів не може бути майбутньою!",
                redirectURI: ""
            })
            setSubmitButtonFaded(false);
            return
        }
        
        Media.save(form)
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

    const sessionUser = getCurrentUser();

    if (!sessionUser && warning === Messages.Empty)
        setWarning(Messages.Unauthorized(props.location.pathname));

    if (entity.isLoaded) {
        if (warning !== Messages.Empty)
            setWarning(Messages.Empty)
    } else 
        Media.getById(id)
            .then(result => {
                if (result.error) {
                    switch (result.error) {
                        case Server.ErrorTypes.Unauthorized:
                            setWarning(Messages.Unauthorized(props.location.pathname))
                            break

                        case Server.ErrorTypes.ConnecionError:
                            setWarning(Messages.ConnectionError)
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
                                Отримати сертифікат про реєстрацію ЗМІ
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