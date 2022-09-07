import NavigationMenu from "components/NavigationMenu/NavigationMenu";
import React from "react";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="about-container">
      <div className="nav-top-right-menu">
        <NavigationMenu />
      </div>
      <h2 className="about-tittle">ABOUT US</h2>
      <h3 className="about-nav">
        THE COLLEGE OF INFORMATION & COMMUNICATION TECHNOLOGY
      </h3>
      <div className="about-content">
        <img
          src="https://scontent.fsgn3-1.fna.fbcdn.net/v/t39.30808-6/277092830_312679057625781_5028282242229111245_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=e3f864&_nc_ohc=whRqPLJJUVUAX-eIs6N&tn=3vFRoDkW5hL2o-CM&_nc_ht=scontent.fsgn3-1.fna&oh=00_AT8kkfcaSRoYFv57M6Q1THUxX6heJsh0jw3Mc3UMZg5fqA&oe=63146232"
          alt=""
          className="img-container-1"
        />
        <div className="about-sub-content">
          <span>CICT and CICT’s main missions</span>
          <div className="line-hr">
            <div className="square"></div>
          </div>
          <p>
            The College of Information & Communications Technology (CICT),
            formerly the Center for Informatics and Electronics (1990), was
            established in 1994.
          </p>
          <br></br>
          <p>
            CICT’s main missions are to offer undergraduate and postgraduate
            programs, and to participate in scientific research and technology
            transfer in the field of Information & Communication Technology
            (ICT).
          </p>
        </div>
      </div>
      <div className="vision-toward">
        <div className="vision-title">CICT’s vision towards 2025</div>
        <div className="line-hr">
          <div className="diamond"></div>
        </div>
        <div className="vision-box">
          <div className="vision-item">Department of Information Systems</div>
          <div className="vision-item">
            Department of Computer Network and Communications
          </div>
          <div className="vision-item">Department of Software Engineering</div>
          <div className="vision-item">Department of Computer Science</div>
          <div className="vision-item">
            Department of Information Technology
          </div>
          <div className="vision-item">Department of Applied Informatics</div>
          <div className="vision-item">Administration Office</div>
          <div className="vision-item">Electronics-Informatics Center</div>
        </div>
        <p>
          From its inception, the College was one of the seven key ICT faculties
          in Vietnam and has been hugely invested in programs and projects such
          as the National Target Program on Information Technology, and the
          Capacity Building Project in Undergraduate and Postgraduate training.
        </p>
        <br></br>
        <p>
          The College has a strong collaboration with the Association of
          French-speaking Universities (AUF) in the Bilingual Information
          Technology program (French instruction) to train IT being-engineers
          with good French communication skills. The College is actively working
          towards co-operating with foreign universities tooffer at least one
          advanced undergraduate program and one advanced master program.
        </p>
        <br></br>
        <p>
          The College conducts effective scientific research and education
          cooperation with multiple partners such as the University of Nantes,
          the University of La Rochelle (France), the French Institute for
          Research & Development (IRD), the French Institute of Informatics
          (IFI, Hanoi), the University of Kemi-Tornio (Finland), etc...
        </p>
        <br></br>
        <p>
          Various research projects have been successfully excuted. Efforts are
          made to increase CICT’s training scale, to improve the quality of its
          academic staff, to upgrade the facilities, and to search for more
          collaboration opportunities.
        </p>
      </div>
      <div className="college">
        <div className="left-side">
          <div className="college-title">
            <span>College </span>
            <span>strengths</span>
          </div>
          <div className="college-item">
            <ul>
              <li>E-learning and distance education</li>
              <li>Geographic Information Systems (GIS)</li>
              <li>Data mining and pattern recognition</li>
              <li>Modeling and simulation</li>
              <li>Big data and cloud computing</li>
              <li>Network and system security</li>
              <li>Mobile communications </li>
            </ul>
          </div>
        </div>
        <div className="right-side">
          <img
            src="https://scontent.fsgn3-1.fna.fbcdn.net/v/t39.30808-6/275923563_312625627631124_3867208868539288578_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=gbNNJqAMMnoAX-GHtnc&_nc_ht=scontent.fsgn3-1.fna&oh=00_AT_r5PmJ2GdMAZE4IUBWwN6zcJtu04T3LmaD6M9s9Qv72A&oe=63141005"
            alt=""
            className="img-container-2"
          />
        </div>
      </div>

      <div className="undergraduate">
        <div className="left-side">
          <img
            src="https://scontent.fsgn3-1.fna.fbcdn.net/v/t39.30808-6/276288263_312625577631129_3137987649390360973_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=sRl_BlpuTqEAX8RrkYn&_nc_ht=scontent.fsgn3-1.fna&oh=00_AT-k1Ju5lCOgB3VoKCCYmMnDj4Z6g_ZqQn7cVtUkRZyCmw&oe=63133700"
            alt=""
            className="img-container-2"
          />
        </div>
        <div className="right-side">
          <div className="undergraduate-title">
            <span>Undergraduate</span>
            <br></br>
            <span>programs</span>
          </div>
          <div className="undergraduate-item">
            <ul>
              <li>Information Systems</li>
              <li>Software Engineering</li>
              <li>Communications & Computer Networks</li>
              <li>Computer Science</li>
              <li>Information Technolo</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="postgraduate">
        <div className="left-side">
          <div className="postgraduate-title">
            <span>Postgraduate </span>
            <span>programs</span>
          </div>
          <div className="postgraduate-item">
            <ul>
              <li>Master of Information Systems</li>
              <li>Master of Computer Science</li>
              <li>Ph.D of Information Systems</li>
            </ul>
          </div>
        </div>
        <div className="right-side">
          <img
            src="https://scontent.fsgn8-2.fna.fbcdn.net/v/t39.30808-6/275879625_312625614297792_5165504687911934932_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=bCx8xk9Gnm0AX8DlPCd&_nc_ht=scontent.fsgn8-2.fna&oh=00_AT8-Klvgxm8JgEU2zIVOb1CSIvkTLp6Jbh6TgY9zSvitzA&oe=6313749A"
            alt=""
            className="img-container-2"
          />
        </div>
      </div>

      <div className="about-footer">
        <div className="about-footer-title">
          National and international cooperation
        </div>
        <div className="line-hr">
          <div className="circle"></div>
        </div>
        <div className="about-footer-content">
          <p>
            CICT would like to cooperate with ICT industrial partners, and ICT
            business in training ICT professional skills for students, and
            developing ICT products. We are ready to have in-depth cooperations
            with provinces and cities in applying ICT in production and daily
            life, and transferring ICT technology.
          </p>
          <br></br>
          <p>
            The College would always like to further develop co-operations with
            domestic and international institutions, universities in scientific
            research, instructor and student exchanges, and developing joint
            education programs
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
