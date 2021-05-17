import React, { useState, createRef } from 'react';
import { useScreenshot, createFileName } from 'use-react-screenshot'

import DefaultMessages from '../../utils/messages';
import Server from '../../utils/server';
import Media from '../../utils/models/media';
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
        //         type_by_purpose: "2",
        //         location : "Самая удивительная локация",
        //         distribution_zone : "2",
        //         readers_category : "8",
        //         volume : "A",
        //         publication_frequency : "A",
        //         registrar : "Самый професиональный регистратор",
        //         register_registration_date : "27/05/2001",
        //     }
        // });
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

    const types = [
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

    for (const type of types) {
        if (type.value == entity.data.type) {
            entity.data.type = type.name
            break
        }
    }

    const types_by_purpose = [
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
    ];

    for (const type_by_purpose of types_by_purpose) {
        if (type_by_purpose.value == entity.data.type_by_purpose) {
            entity.data.type_by_purpose = type_by_purpose.name
            break
        }
    }

    const distribution_zones = [
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

    for (const distribution_zone of distribution_zones) {
        if (distribution_zone.value == entity.data.distribution_zone) {
            entity.data.distribution_zone = distribution_zone.name
            break
        }
    }

    const readers_categories = [
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

    for (const readers_category of readers_categories) {
        if (readers_category.value == entity.data.readers_category) {
            entity.data.readers_category = readers_category.name
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
                        {"(повне найменування)"}
                    </div>
                </div>
                <div className="certificate_block">Вид видання: <span className="certificate_underline">{ entity.data.type }</span></div>
                <div className="certificate_block">Статус видання: <span className="certificate_underline">{ entity.data.status == 0 ? "Вітчизняне" : "Спільне" }</span></div>
                <div className="certificate_block">Мови видання: <span className="certificate_underline">{ entity.data.languages }</span></div>
                <div className="certificate_block">Вид за цільовим призначенням: <span className="certificate_underline">{ entity.data.type_by_purpose }</span></div>
                <div className="certificate_block">Обсяг, періодичність: <span className="certificate_underline">{ entity.data.volume }; { entity.data.publication_frequency }</span></div>
                <div className="certificate_block">Сфера розповсюдження та категорія читачів: <span className="certificate_underline">{ entity.data.distribution_zone }; { entity.data.readers_category }</span></div>
                <div className="certificate_block">Засновник (співзасновник): <span className="certificate_underline">{entity.data.founders}</span></div>
                <div className="certificate_block">Програмні цілі (основні принципи) або тематична спрямованість <span className="certificate_underline">{ entity.data.goals }</span></div>
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