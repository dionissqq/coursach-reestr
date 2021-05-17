import React, { useState, createRef } from 'react';
import { useScreenshot, createFileName } from 'use-react-screenshot'

import DefaultMessages from '../../utils/messages';
import Server from '../../utils/server';
import Agency from '../../utils/models/agency';
import { getCurrentUser } from '../../utils/auth';

import './certificate.css'

const Messages = Object.assign ({}, DefaultMessages)

export default function AgencyCertificate(props) {
    document.body.className = "";
    document.title = "Свідоцтво";

    const id = props.match.params.id;

    const [entity, setEntity] = useState({
        isLoaded: false,
        data: {}
    })

    const [warning, setWarning] = useState(Messages.Loading);

    const [, takeScreenshot] = useScreenshot();

    const sessionUser = getCurrentUser();

    if (!sessionUser && warning === Messages.Empty) {
        setWarning(Messages.Unauthorized(props.location.pathname));
        return
    }

    const ref = createRef(null)

    if (entity.isLoaded) {
        if (warning !== Messages.Empty)
            setWarning(Messages.Empty)
    } else 
        // setEntity({
        //     isLoaded : true,
        //     data : {
        //         certificate_number : "FF 88888888",
        //         name : "Супер дупер умное информагенство",
        //         founders : "Супер дупер умный основатель",
        //         type : "1",
        //         form : "1",
        //         goals: "Самые умные цели",
        //         languages : "Самые крутые языки в мире",
        //         distribution_scope : "2",
        //         location : "Самая удивительная локация",
        //         connection : "+380666666666",
        //         registrar : "Самый професиональный регистратор",
        //         register_registration_date : "27/05/2001",
        //     }
        // });
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

    if (entity.data.certificate_number) {
        const certificate_ids = entity.data.certificate_number.split(' ')
        entity.data.certificate_series = certificate_ids[0]
        entity.data.certificate_id = certificate_ids[1]
    }

    const forms = [
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

    for (const form of forms) {
        if (form.value == entity.data.form) {
            entity.data.form = form.name
            break
        }
    }

    const dist_scopes = [
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
    ];

    for (const scope of dist_scopes) {
        if (scope.value == entity.data.distribution_scope) {
            entity.data.distribution_scope = scope.name
            break
        }
    }

    function onDownload() {
        takeScreenshot(ref.current)
            .then((image, { name = "img", extension = "jpg" } = {}) => {
                const a = document.createElement("a");
                a.href = image;
                a.download = createFileName(extension, name);
                a.click();
            })
    }
    return (
        warning && warning !== "" ?
        <div className="center">
            { warning }
        </div>
        :
        <React.Fragment>
            <div id="certificate" ref={ref} className="certificate_box">
                <img src="/images/coat_of_arms.jpg" className="certificate_image" alt=""></img>
                <div className="certificate_align_center">МІНІСТЕРСТВО ЮСТИЦІЇ</div>
                <br />
                <div className="certificate_align_center">СВІДОЦТВО</div>
                <div className="certificate_align_center">ПРО ДЕРЖАВНУ РЕЄСТРАЦІЮ</div>
                <div className="certificate_align_center">ДРУКОВАНОГО ЗАСОБУ МАСОВОЇ ІНФОРМАЦІЇ</div>
                <br />
                <div className="certificate_space_between">
                    <div className="certificate_inline">Серія <span className="certificate_underline">{ entity.data.certificate_series }</span></div>
                    <div className="certificate_inline certificate_align_right">N <span className="certificate_underline">{ entity.data.certificate_id }</span></div>
                </div>
                <div className="certificate_block">
                    <div className="certificate_underline certificate_align_center">
                        { entity.data.name }
                    </div>
                    <div className="certificate_align_center">
                        {"(повне найменування та скорочена назва агентства державною мовою)"}
                    </div>
                </div>
                <div className="certificate_block">Засновник (співзасновник) <span className="certificate_underline">{entity.data.founders}</span></div>
                <div className="certificate_block">Вид та організаційно-правова форма <span className="certificate_underline">{ entity.data.type === "1" ? "Державне" : "Недержавне" }; { entity.data.form }</span></div>
                <div className="certificate_block">Програмна мета (основні напрями діяльності) <span className="certificate_underline">{ entity.data.goals }</span></div>
                <div className="certificate_block">Мова (мови) інформації <span className="certificate_underline">{ entity.data.languages }</span></div>
                <div className="certificate_block">Сфера розповсюдження інформаційної продукції <span className="certificate_underline">{ entity.data.distribution_scope }</span></div>
                <div className="certificate_block">Місцезнаходження та номери засобів зв'язку інформаційного агентства <span className="certificate_underline">{ entity.data.location }; { entity.data.connection }</span></div>
                <div className="certificate_block">
                    <div className="certificate_underline certificate_align_center">
                        { entity.data.registrar }
                    </div>
                    <div className="certificate_align_center">
                        {"(посада і прізвище керівника органу, який здійснив реєстрацію)"}
                    </div>
                </div>
                <div className="certificate_space_between">
                    <div>
                        <div className="certificate_underline certificate_align_center">
                            { entity.data.register_registration_date }
                        </div>
                        <div className="certificate_align_center">
                            {"(дата реєстрації)"}
                        </div>
                    </div>
                    <div>
                        <div className="certificate_underline certificate_align_center">
                            ________________
                        </div>
                        <div className="certificate_align_center">
                            {"(підпис)"}
                        </div>
                    </div>
                </div>
            </div>
            <div className="certificate_download_button_outter">
                <div className="button light_shadow white_button" onClick={onDownload}>
                    Завантажити
                </div>
            </div>
        </React.Fragment>
    );
}