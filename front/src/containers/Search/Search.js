import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import qs from 'qs'

import './search.css';
import Server from '../../utils/server';
import { getCurrentUser } from '../../utils/auth';
import Messages from '../../utils/messages';
import SID from '../../utils/models/sid'
import Form from '../../components/Form/Form';

const WarningType = {
    None : 0,
    ServerError : 1,
    ConnecionError : 2,
    Loading : 3
};

export default function Search(props) {
    document.body.className = "";
    document.title = "Search";

    const vals = qs.parse(props.location.search, { ignoreQueryPrefix: true })
    
    const [typeSelectorOptions, setTypeSelectorOptions] = useState([]);
    const [warning, setWarning] = useState(WarningType.Loading);
    const [entities, setQuery] = useState({
        isLoaded : false,
        data : [],
        pagesAmount : 0,
        query : {
            name: vals.name,
            kind: vals.kind,
            type: vals.type,
        },
    });

    const sessionUser = getCurrentUser();

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

        document.location = `/search?name=${name}&kind=${kind}&type=${type}`
    }

    function loadData () {
        if (entities.isLoaded) {
            if (warning != WarningType.None)
                setWarning(WarningType.None);
            return;
        }
        SID.getAll(entities.query)
            .then ((result) => {
                if (result.error) {
                    entities.isLoaded = true;
                    switch(result.error) {
                        case Server.ErrorTypes.Unauthorized:
                            return document.location = "/login?info=mustLogin&redirect=/";

                        case Server.ErrorTypes.ConnecionError:
                            setWarning(WarningType.ConnecionError);
                            break;

                        default:
                            setWarning(WarningType.ServerError);
                    }
                    return;
                }
                setQuery({
                    isLoaded : true,
                    data : result.data.entities,
                    query : entities.query
                });
            });
    //     setQuery({
    //         isLoaded : true,
    //         data : [
    //             {
    //                 id: "1",
    //                 name: "Гірка правда",
    //                 certificate_number: "КВ 1494",
    //                 type: "1",
    //                 registration_date: "09.06.1995",
    //                 founders: `Благодійна громадська організація Фонд соціально-економічних і гуманітарних досліджень "Альтернатива"`,
    //                 final_registration_unit : "Міністерство України у справах преси та інформації"
    //             },
    //             {
    //                 id: "2",
    //                 name: "Шахтарська правда",
    //                 certificate_number: "КГ 0277-У",
    //                 type: "1",
    //                 registration_date: "30.01.2002",
    //                 founders: `Державна холдингова компанія "Олександріявугілля"\nКіровоградський територіальний комітет працівників вугільної промисловості України`,
    //                 final_registration_unit : "Управління внутрішньої політики та суспільно-політичного моніторингу Кіровоградської обласної державної адміністрації"
    //             },
    //             {
    //                 id: "2",
    //                 name: "Шахтарська правда",
    //                 certificate_number: "КГ 0277-У",
    //                 type: "1",
    //                 registration_date: "30.01.2002",
    //                 founders: `Державна холдингова компанія "Олександріявугілля"\nКіровоградський територіальний комітет працівників вугільної промисловості України`,
    //                 final_registration_unit : "Управління внутрішньої політики та суспільно-політичного моніторингу Кіровоградської обласної державної адміністрації"
    //             }
    //         ],
    //         query : entities.query
    //     });
    }

    loadData();

    const onKindChange = (value) => {
        if (value === "media")
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

    if (typeSelectorOptions.length == 0 && entities.query.kind) {
        onKindChange(entities.query.kind)
    }

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
                        placeholder : "Введіть назву СІД...",
                        defaultValue : entities.query.name
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
                                defaultValue : entities.query.kind,
                                onChange: (event) => onKindChange(event.target.value)
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
                                className: "sth",
                                defaultValue : entities.query.type,
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
            },
            props: {
                style: {
                    marginTop: "2.7rem",
                    maxWidth: "90%",
                    width: "58rem"
                }
            }
        };
    }

    return (
        <React.Fragment>
            <Form {...getFormProps()}/>
            {
                warning !== WarningType.None ?
                    <div style={{textAlign: "center", margin: "8vh auto"}}>
                        { warning === WarningType.ServerError ? Messages.ServerError : "" }
                        { warning === WarningType.ConnecionError ? Messages.ConnectionError : "" }
                        { warning === WarningType.Loading ? Messages.Loading : "" }
                    </div>
                :
                <div className="table midMarginTop">
                    {
                        entities.data.length
                        ?
                        <React.Fragment>
                            <div className = "first_table_row table_row">
                                <div className = "table_cell users_table_cell">
                                    Серія та номер свідоцтва
                                </div>
                                <div className = "table_cell users_table_cell">
                                    Вид видання
                                </div>
                                <div className = "table_cell users_table_cell">
                                    Назва видання
                                </div>
                                <div className = "table_cell users_table_cell">
                                    Дата реєстрації
                                </div>
                                <div className = "table_cell users_table_cell">
                                    Засновники
                                </div>
                                <div className = "table_cell users_table_cell">
                                    Орган, що здійснив реєстрацію
                                </div>
                            </div>
                            {
                                entities.data.map((sid, index) => {
                                    return (
                                        <Link to={ sessionUser ? `/${entities.query.kind}/${sid.id}` : "#" } className="no_link">
                                            <div className = "table_row">
                                                <div className = "table_cell users_table_cell">
                                                    {sid.certificate_number}
                                                </div>
                                                <div className = "table_cell users_table_cell">
                                                    {sid.type}
                                                </div>
                                                <div className = "table_cell users_table_cell">
                                                    { sid.name }
                                                </div>
                                                <div className = "table_cell users_table_cell">
                                                    { sid.registration_date }
                                                </div>
                                                <div className = "table_cell users_table_cell">
                                                    { sid.founders }
                                                </div>
                                                <div className = "table_cell users_table_cell">
                                                    { sid.final_registration_unit }
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                })
                            }
                        </React.Fragment>
                        :
                        <div style={{textAlign: "center", margin: "8vh auto"}}>
                            {
                                entities.query
                                ?
                                "Nothing was found. Try another search term."
                                :
                                "There's nothing to see here at yet"
                            }
                        </div>
                    }
                </div>
            }
        </React.Fragment>
    )
}
