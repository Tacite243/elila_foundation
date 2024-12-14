import Image from "next/image";

interface ArticleData {
    title: string;
    underTitle: string;
    description: string;
    content: {
        section: string;
        section1: string;
    };
    imgSource: string;
}

export default function ArticleFormat(Data: ArticleData) {
    return (
        <section id="services" className="services section">
            {/* Section Title */}
            <div className="container section-title" data-aos="fade-up">
                <h2>{Data.title}</h2>
                <span><em>{Data.underTitle}</em></span><br /><br />
                <p>{Data.description}</p>
                <div>
                    <div className="container" data-aos="fade-up" data-aos-delay="100">
                        <br /><br />
                        <div className="row gy-4">
                            <div className="col-lg-6 order-2 order-lg-1 content">
                                <Image
                                    src={Data.imgSource}
                                    className="img-fluid"
                                    alt="About Us"
                                    width={200}
                                    height={300}
                                />
                            </div>
                            <div className="col-lg-6 order-1 order-lg-2">
                                <p>{Data.content.section}</p>
                            </div>
                        </div>
                        <br /><br />
                        <div>{Data.content.section1}</div>
                    </div>
                </div>
            </div>
        </section>
    )
}