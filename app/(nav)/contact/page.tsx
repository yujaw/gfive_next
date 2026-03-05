'use client'

import axios from '@/api/axios'
import { Fragment, useState, useEffect } from 'react'
import Link from 'next/link'
import { useToast } from '@/hooks/useToast'
import { useSelector } from 'react-redux'
import { useWindow } from '@/hooks/useWindow'

interface ContactInterface {
    name: string,
    email: string,
    phone: string,
    message: string,
}

const Map = () => {

    return (
        <Fragment>
            <div className="map_overlay">
                <div className="map_container">
                    <iframe title='map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224.62093559909994!2d85.30738021424384!3d27.69521128301764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1900a53ff531%3A0x8bfe16405823c337!2sGlobal%20IT%20Support%20Pvt.%20Ltd.!5e1!3m2!1sen!2snp!4v1680020537242!5m2!1sen!2snp" width="900" height="500" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
        </Fragment>
    )
}

const Contact = () => {

    const [map, showMap] = useState<boolean>(false)
    const { errorNotification, successNotification } = useToast()
    const { isWide } = useWindow()

    const [contact, setContact] = useState<ContactInterface>({
        name: '',
        email: '',
        phone: '',
        message: ''
    })

    useEffect(() => {
        map ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'scroll'
    }, [, map])

    useEffect(() => {
        let handler = (e: MouseEvent) => {
            if ((e.target as HTMLElement).className === 'map_overlay') {
                showMap(false)
            }
        }

        document.addEventListener("click", handler)
    })

    const postData = async () => {
        const { name, email, phone, message } = contact
        if (!name || !email || !message) return errorNotification("Input fields cannot be left empty")
        try {
            await axios
                .post('/api/comment',
                    {
                        name,
                        email,
                        phone,
                        message
                    })
                .then(() => {
                    successNotification('Message Sent Successfully')
                    setContact({
                        name: '',
                        email: '',
                        phone: '',
                        message: ''
                    })
                })
        } catch (err) {
            errorNotification("Error while sending message")
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setContact({
            ...contact,
            [name]: value
        })
    }

    return (
        <Fragment>
            <div className="contact_container">
                <div className="contact">
                    <div className="content">
                        <div className="left">
                            {
                                isWide ?
                                    (
                                        <div className="title_cont">
                                            <div className="utils">
                                                <div className="ico" />
                                                <div className="ico" />
                                                <div className="ico" />
                                            </div>
                                            <span className="title">contact us</span>
                                        </div>
                                    )
                                    : null
                            }
                            <div className="container">
                                <div className="cont">
                                    <button onClick={() => showMap(!map)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="20" height="20">
                                            <path d="M12,6a4,4,0,1,0,4,4A4,4,0,0,0,12,6Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,12Z" />
                                            <path d="M12,24a5.271,5.271,0,0,1-4.311-2.2c-3.811-5.257-5.744-9.209-5.744-11.747a10.055,10.055,0,0,1,20.11,0c0,2.538-1.933,6.49-5.744,11.747A5.271,5.271,0,0,1,12,24ZM12,2.181a7.883,7.883,0,0,0-7.874,7.874c0,2.01,1.893,5.727,5.329,10.466a3.145,3.145,0,0,0,5.09,0c3.436-4.739,5.329-8.456,5.329-10.466A7.883,7.883,0,0,0,12,2.181Z" />
                                        </svg>
                                        {isWide ? 'Panchakuti Marga, Kathmandu 44600' : null}
                                    </button>
                                </div>
                                <div className="cont">
                                    <Link href="mailto:info@gfive.com.np">
                                        <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="20" height="20">
                                            <path d="M19,1H5A5.006,5.006,0,0,0,0,6V18a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V6A5.006,5.006,0,0,0,19,1ZM5,3H19a3,3,0,0,1,2.78,1.887l-7.658,7.659a3.007,3.007,0,0,1-4.244,0L2.22,4.887A3,3,0,0,1,5,3ZM19,21H5a3,3,0,0,1-3-3V7.5L8.464,13.96a5.007,5.007,0,0,0,7.072,0L22,7.5V18A3,3,0,0,1,19,21Z" />
                                        </svg>
                                        {isWide ? 'info@gfive.com.np' : null}
                                    </Link>
                                </div>
                                <div className="cont">
                                    <Link href="tel:015343455">
                                        <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="20" height="20">
                                            <path d="M19,21c0,.553-.447,1-1,1H6c-.552,0-1-.447-1-1s.448-1,1-1h12c.553,0,1,.447,1,1Zm-13-3c.552,0,1-.448,1-1s-.448-1-1-1-1,.448-1,1,.448,1,1,1Zm-4,2c-.552,0-1,.448-1,1s.448,1,1,1,1-.448,1-1-.448-1-1-1Zm0-4c-.552,0-1,.448-1,1s.448,1,1,1,1-.448,1-1-.448-1-1-1Zm9,1c0-.552-.448-1-1-1s-1,.448-1,1,.448,1,1,1,1-.448,1-1Zm13-7.915l-.085,1.264c.002,1.431-1.219,2.651-2.719,2.651-.044,0-2.522-.322-2.522-.322-1.445-.038-2.613-1.208-2.648-2.654l-.155-1.292c-1.309-.494-2.609-.748-3.875-.754-1.311,.008-2.587,.243-3.864,.744l-.157,1.302c-.035,1.446-1.203,2.616-2.648,2.654,0,0-2.479,.322-2.523,.322C1.303,13,.083,11.779,.083,10.279L.002,9.153c-.003-1.451,.549-2.767,1.554-3.772C6.046,.892,17.954,.892,22.443,5.381c1.005,1.006,1.558,2.321,1.557,3.704Zm-1.998-.07c0-.779-.346-1.593-.974-2.22-3.983-3.983-14.625-3.431-18.057,0-.627,.627-.972,1.44-.971,2.288l.08,1.127c.002,.446,.298,.762,.672,.788,0,0,2.458-.319,2.502-.319,.397,0,.721-.324,.721-.722,0-.04,.24-2.051,.24-2.051,.042-.349,.264-.65,.584-.794,1.683-.753,3.476-1.135,5.206-1.135,1.704,.009,3.447,.388,5.179,1.128,.329,.141,.558,.445,.601,.801,0,0,.239,2.011,.239,2.051,0,.397,.324,.722,.722,.722,.044,0,2.502,.319,2.502,.319,.373-.026,.669-.339,.669-.719l.085-1.265Zm-7.002,7.985c0-.552-.448-1-1-1s-1,.448-1,1,.448,1,1,1,1-.448,1-1Zm7-1c-.552,0-1,.448-1,1s.448,1,1,1,1-.448,1-1-.448-1-1-1Zm0,4c-.552,0-1,.448-1,1s.448,1,1,1,1-.448,1-1-.448-1-1-1Zm-4-4c-.552,0-1,.448-1,1s.448,1,1,1,1-.448,1-1-.448-1-1-1Z" />
                                        </svg>
                                        {isWide ? '01-5343455' : null}
                                    </Link>
                                </div>
                            </div>
                        </div>
                        {
                            map ? <Map /> : null
                        }
                        <div className="right">
                            <div className="title_cont">
                                <div className="utils">
                                    <div className="ico" />
                                    <div className="ico" />
                                    <div className="ico" />
                                </div>
                                <span className="title">
                                    send your comments
                                </span>
                            </div>
                            <div className='form'>
                                <div className="input">
                                    <div className="cont">
                                        <label>
                                            {
                                                isWide ?
                                                    (
                                                        <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="15" height="15">
                                                            <path d="M12,12A6,6,0,1,0,6,6,6.006,6.006,0,0,0,12,12ZM12,2A4,4,0,1,1,8,6,4,4,0,0,1,12,2Z" />
                                                            <path d="M12,14a9.01,9.01,0,0,0-9,9,1,1,0,0,0,2,0,7,7,0,0,1,14,0,1,1,0,0,0,2,0A9.01,9.01,0,0,0,12,14Z" />
                                                        </svg>
                                                    )
                                                    : null
                                            }
                                        </label>
                                        <input name="name" placeholder="full name" value={contact.name} type="text" onChange={handleChange} />
                                    </div>
                                    <span className="req">
                                        This Field is Required*
                                    </span>
                                </div>
                                <div className="input">
                                    <div className="cont">
                                        <label>
                                            {
                                                isWide ?
                                                    (
                                                        <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="15" height="15">
                                                            <path d="M19,1H5A5.006,5.006,0,0,0,0,6V18a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V6A5.006,5.006,0,0,0,19,1ZM5,3H19a3,3,0,0,1,2.78,1.887l-7.658,7.659a3.007,3.007,0,0,1-4.244,0L2.22,4.887A3,3,0,0,1,5,3ZM19,21H5a3,3,0,0,1-3-3V7.5L8.464,13.96a5.007,5.007,0,0,0,7.072,0L22,7.5V18A3,3,0,0,1,19,21Z" />
                                                        </svg>
                                                    )
                                                    : null
                                            }
                                        </label>
                                        <input name="email" placeholder="email" type="text" value={contact.email} onChange={handleChange} />
                                    </div>
                                    <span className="req">
                                        This Field is Required*
                                    </span>
                                </div>
                                <div className="input">
                                    <div className="cont">
                                        <label>
                                            {
                                                isWide ?
                                                    (
                                                        <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="15" height="15"                                            >
                                                            <path d="M13,1a1,1,0,0,1,1-1A10.011,10.011,0,0,1,24,10a1,1,0,0,1-2,0,8.009,8.009,0,0,0-8-8A1,1,0,0,1,13,1Zm1,5a4,4,0,0,1,4,4,1,1,0,0,0,2,0,6.006,6.006,0,0,0-6-6,1,1,0,0,0,0,2Zm9.093,10.739a3.1,3.1,0,0,1,0,4.378l-.91,1.049c-8.19,7.841-28.12-12.084-20.4-20.3l1.15-1A3.081,3.081,0,0,1,7.26.906c.031.031,1.884,2.438,1.884,2.438a3.1,3.1,0,0,1-.007,4.282L7.979,9.082a12.781,12.781,0,0,0,6.931,6.945l1.465-1.165a3.1,3.1,0,0,1,4.281-.006S23.062,16.708,23.093,16.739Zm-1.376,1.454s-2.393-1.841-2.424-1.872a1.1,1.1,0,0,0-1.549,0c-.027.028-2.044,1.635-2.044,1.635a1,1,0,0,1-.979.152A15.009,15.009,0,0,1,5.9,9.3a1,1,0,0,1,.145-1S7.652,6.282,7.679,6.256a1.1,1.1,0,0,0,0-1.549c-.031-.03-1.872-2.425-1.872-2.425a1.1,1.1,0,0,0-1.51.039l-1.15,1C-2.495,10.105,14.776,26.418,20.721,20.8l.911-1.05A1.121,1.121,0,0,0,21.717,18.193Z" />
                                                        </svg>
                                                    )
                                                    : null
                                            }
                                        </label>
                                        <input type="phone" value={contact.phone} placeholder="phone" name="phone" onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="txt_cont">
                                    <textarea name="message" value={contact.message} className="message" placeholder="write a message" onChange={handleChange}></textarea>
                                    <span className="req">
                                        This Field is Required*
                                    </span>
                                </div>
                                <input type="button" value="Send Message" onClick={postData} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Contact