import { Fragment } from 'react'

const About = () => {

    return (
        <Fragment>
            <div className="info-container">
                <div className="header">
                    <div className="title">About</div>
                </div>
                <div className="info">
                    <div className="container">
                        G-Five is an ICT System Integrator that provides complete IT solutions to the information technology industry. The company was founded in 2009 and has over {new Date().getFullYear() - 2009} years of experience in supporting organizations and companies nationally and internationally with their IT hardware and software needs. GITS has a flexible and consultative approach to achieving the best possible level of client satisfaction and delivering desired end results. They have a team of highly qualified and experienced professionals who specialize in sales, support, system integration, maintenance and software development, network and hardware solutions, printers and laptops. GITS manages projects from concept to completion and has end-to-end expertise. The company is results-oriented and has a passion for helping clients achieve excellence.
                        <div className="sub_container">
                            <div className="sub_title">Why choose us</div>
                            <div className="desc">G-Five boasts an experienced team of professionals who have been in the business for a long time and are dedicated to serving you. With a commitment to providing high-quality services, we guarantee that our solutions will meet your needs and provide you with the service you desire. We also offer free consultation services, which can prove to be essential for small and medium-sized businesses. Our effectiveness is a testament to our years of experience, and our clients have always been satisfied with our work. We offer top-quality services at affordable rates, catering primarily to small to large businesses, ensuring that our rates fit your budget easily. Choose Global IT Support Pvt. Ltd. for all your IT needs, and experience the difference our team of experienced professionals can make for your business.</div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment >
    )
}

export default About