import { Fragment } from 'react'

const Privacy = () => {
    return (
        <Fragment>
            <div className="info-container">
                <div className="header">
                    <div className="title">Privacy Policy</div>
                </div>
                <div className="info">
                    <div className="container">
                        This Privacy Policy governs the manner in which Gfive Technologies Pvt. Ltd. collects, uses, maintains, and discloses information collected from users of the Gfive Technologies website www.gfive.com.np.
                        <div className="sub_container">
                            <div className="sub_title">Personal Identification Information</div>
                            <div className="desc">We may collect personal identification information from Users in various ways, including but not limited to, when Users visit our site, fill out a form, and in connection with other activities, services, features, or resources we make available on our Site. Users may be asked for, as appropriate, name, email address, phone number, and other relevant information.</div>
                            <div className="sub_title">Non-Personal Identification Information</div>
                            <div className="desc">We may collect non-personal identification information about Users whenever they interact with our Site. Non-personal identification information may include the browser name, the type of computer, and technical information about Users' means of connection to our Site, such as the operating system and the Internet service providers utilized.</div>
                            <div className="sub_title">How We Use Collected Information</div>
                            <div className="desc">Gfive Technologies may collect and use Users' personal information for the following purposes:
                            <ul className='list'>
                                <li>To personalize the user experience</li>
                                <li>To improve our Site</li>
                                <li>To send periodic emails</li>
                            </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment >
    )
}

export default Privacy