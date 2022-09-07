import NavigationMenu from "components/NavigationMenu/NavigationMenu";
import React, { useState } from "react";
import "./Department.css";

const Department = () => {
  const [toggleState, setToggleState] = useState(1);

  const handleTabs = (index) => {
    setToggleState(index);
  };

  return (
    <div className="department">
      <div className="nav-bot-right-menu">
        <NavigationMenu />
      </div>
      <div className="depart-header">Department</div>
      <div className="depart-content">
        <div className="depart-nav">
          <ul>
            <li
              onClick={() => handleTabs(1)}
              className={toggleState === 1 ? "tabs tabs-active" : "tabs"}
            >
              ADMIN OFFICE
            </li>
            <li
              onClick={() => handleTabs(2)}
              className={toggleState === 2 ? "tabs tabs-active" : "tabs"}
            >
              Software Engineering (DoSE)
            </li>
            <li
              onClick={() => handleTabs(3)}
              className={toggleState === 3 ? "tabs tabs-active" : "tabs"}
            >
              COMPUTER SCIENCE
            </li>
            <li
              onClick={() => handleTabs(4)}
              className={toggleState === 4 ? "tabs tabs-active" : "tabs"}
            >
              INFORMATION SYSTEM
            </li>
            <li
              onClick={() => handleTabs(5)}
              className={toggleState === 5 ? "tabs tabs-active" : "tabs"}
            >
              Computer Networks And Communication
            </li>
            <li
              onClick={() => handleTabs(6)}
              className={toggleState === 6 ? "tabs tabs-active" : "tabs"}
            >
              Information Technology
            </li>
            <li
              onClick={() => handleTabs(7)}
              className={toggleState === 7 ? "tabs tabs-active" : "tabs"}
            >
              Applied Informatics
            </li>
          </ul>
        </div>
        {toggleState === 1 && (
          <div className="depart-data">
            <div className="title">ADMIN OFFICE</div>
            <div className="sub-title">I. FUNCTION</div>
            <div className="content">
              The Administration Office functions as a consultancy and assisting
              agency for the College’s Management Board in the organization and
              management of administrative-related affairs, human resource,
              academic affairs, finance, properties, equipment, facilities,
              training, research activities, and international relations.
            </div>
            <div className="sub-title">II. RESPONSIBILITIES</div>
            <div className="content">
              <ul>
                The Administration Office assists the Management Board on
                different activities related to administration, information
                exchanges (maintaining the information flow including a variety
                of official documents such as official letters or reports), and
                fulfilling the normative administrative procedures, which should
                be under the Management Board’s examination and decision before
                disseminating to the upper management level or other involved
                units. These include:
                <li>
                  <br />
                  Monitoring and managing the faculty’s academic affairs in
                  accordance to the university’s academic calendar including
                  teaching plan, faculty workload, and students’ academic
                  performance.
                </li>
                <li>
                  Keeping records of both permanent and contracted staff and
                  students to produce reports upon request from the Personnel
                  Department and Academic Affairs Department, respectively.
                </li>
                <li>
                  Proposing plans and fulfilling all the accompanied procedures
                  for staff capacity building with regard to professional
                  development, ideology, ICT-related skills and foreign language
                  competences, which will be presented to the Rectorate Board
                  (via the Personnel Department).
                </li>
                <li>
                  Fulfilling all the required procedures to recruit new
                  graduates and related processes upon the completion of their
                  probationary term.
                </li>
                <li>
                  Keeping records of the staff’s salary process and those
                  entitled to salary increase with accompanied information on
                  their work performance and achievements (consultation with the
                  Personnel Department is requested in case of doubts before
                  presenting to the Standing Wage Committee); finalizing and
                  sending the list of eligible candidates to the university and
                  the Personnel Department upon the decision of the Standing
                  Wage Committed.
                </li>
                <li>
                  Keeping records of the staff’s annual appraisals and proposing
                  a recommendation list of units and individuals with
                  distinguished accomplishments or poor performance to the
                  university for the granting of rewards, honours, or sanction
                  enforcement under the current regulations.
                </li>
                <li>
                  Monitoring the routine conduct among the staff and students on
                  different aspects and reporting any irregularities to the
                  College’s Management Board and concerned bodies.
                </li>
                <li>
                  Monitoring the staff’s work performance and reporting on cases
                  of absence or leave without permission to the university (via
                  the Personnel Department)
                </li>
                <li>
                  Keeping records and monitoring the progress of projects,
                  research and technology transfer activities, and international
                  collaboration conducted by the staff and the students.
                </li>
                <li>
                  Coordinating the post-graduate programs offered by the
                  College.
                </li>
                <li>
                  Keeping records of the college’s expenditure budget,
                  properties, equipment, and facilities; proposing plans for the
                  bidding of assets and supplies in accordance to the
                  university’s regulation.
                </li>
                <li>
                  Steering the maintaining of security, labor safety,
                  properties, equipment, facilities, sanitation, and
                  environmental protection within the college’s compound.
                </li>
                <li>
                  Ensuring that all the announcements, forms, regulations, and
                  administration procedures related to the staff and students
                  are updated and adequately communicated via the College
                  website.
                </li>
              </ul>
            </div>
          </div>
        )}

        {toggleState === 2 && (
          <div className="depart-data">
            <div className="title">
              Department Of Software Engineering (DoSE)
            </div>
            <div className="sub-title">I. Introduction</div>
            <div className="content">
              The DoSE was established on April 25, 2007 under Decision No.
              626/QD-DHCT.At the present, the department has 14 lecturers,
              including 1 Associate Professor, 7 PhDs and 6 Masters. With highly
              qualified lecturers, the DoSE is in charge of managing
              undergraduate training programmes in Software Engineering;
              participates in the CICT’s graduate programmes; conducts research;
              cooperates, supports, consults and transfers technology in the
              field of IT with partners in the Mekong Delta and Southern
              Vietnam.
              <br></br>
              The mission of DoSE is to train students in Software Engineering
              at the Bachelor engineering of software engineering (BESE);
              Scientific research and technology transfer in the fields related
              to Software Technology to meet the needs of human resources and
              the development trend of the industry. In addition, the DoSE is
              also in charge of teaching-related modules at the undergraduate
              and graduate level for Computer Networking & Communication,
              Computer Science, and Information Systems.
              <br></br>
              The vision of the DoSE to 2025 is to become a prestigious training
              and scientific research unit in software technology, playing a key
              role in training, research and technology transfer for the Mekong
              Delta region. The training programmes meet the quality standards
              applicable to advanced universities in Viet Nam as well as in
              Southeast Asia.
              <br></br>
              At present, the BESE is supplying important human resources in
              areas related to SE for national and international organizations,
              corporations and institutions in Vietnam.
            </div>
            <div className="sub-title">II. Contact</div>
            <div className="content">
              {" "}
              Dr. Trương Minh Thái, email: tmthai@cit.ctu.edu.vn
              <br></br>
              MSc.Võ Huỳnh Trâm; email: vhtram@cit.ctu.edu.vn
              <br></br>
              Website: http://se.cit.ctu.edu.vn/
            </div>
          </div>
        )}

        {toggleState === 3 && (
          <div className="depart-data">
            <div className="title">COMPUTER SCIENCE</div>
            <div className="sub-title">I. Training</div>
            <div className="content">
              <ul>
                Engineers who specialized in the field of Computer Science with
                the following qualities:
                <li>
                  Acquiring the basic principles of Marxism – Leninism, the
                  revolutionary approach of Vietnam Communist Party, Ho Chi Minh
                  Ideology; basic knowledge in the field of Social Science and
                  temporary issues.
                </li>
                <li>
                  Being capable of employing scientific knowledge, particularly
                  mathematics.
                </li>
                <li>
                  Gaining effective communication skills (in both native
                  language and the English language, equivalent to TOEIC 350).
                </li>
                <li>
                  Developing self-study skills and cultivating a long-life
                  learning attitudes.
                </li>
                <li>
                  Acquiring an appropriate attitude to the impact of technology
                  on these aspects of economics, society, and environment on a
                  global scale.
                </li>
                <li>
                  Being capable of working in specialized and multi-discipline
                  groups.
                </li>
                <li>Gaining specialized knowledge and work ethics.</li>
                <li>
                  Being able to collect data and expert knowledge, analyze and
                  explain the data, expert knowledge by models and solve current
                  problems based on the models.
                </li>
                <li>
                  Being able to applying the knowledge and technology to develop
                  expert systems in the field of decision support, diagnosis,
                  prediction and adoption.
                </li>
                <li>
                  Being able to apply the knowledge and technology to develop
                  knowledge discovery systems and evaluate the discovered
                  knowledge in building decision support systems, diagnosis,
                  prediction and adaption.
                </li>
                <li>
                  Being able to simulate systems and build simulation systems on
                  computer.The Department takes over a number of courses like:
                  Distributed Mathematics, Linear Programming, Computing Method,
                  Simulation, Queing Theory, Information Theory, Computer
                  Graphics, Image Processing, Artificial Intelligence, Machine
                  Learning, Data Mining, Knowledge Fundamentals, Intelligent
                  Systems, Natural Language Processing, Compiler, Computer
                  Vision, Research Method and Presentation.Involving in
                  post-graduate training: Advanced Artificial Intelligence,
                  Machine Learning, Data Mining, Random Dynamic Programming.
                </li>
              </ul>
            </div>
            <div className="sub-title">
              II. Scientific And Teaching Research
            </div>
            <div className="content">
              After proposing a plan for the establishment of the Department,
              since the year 2000 the Dean board and lecturers in charge have
              made great effort to promote human resource training and
              scientific activities, which helps to lay a good foundation for
              the Department. The result is 3 groups of young and competent
              teaching staff whose fields of study include Knowledge Discovery
              and Data Mining, Image and Multi-media data Searching, and
              Modeling and Simulation.
              <br></br>
              <ul>
                Knowledge Discovery and Data Mining research group focuses
                mainly on data mining algorithms:
                <li>Decision tree</li>
                <li>Support Vector Machine</li>
                <li>
                  Ensemble-based methods: Bagging, Boosting, and Random Forest.
                </li>
                <li>Data clustering and pretopology approach.</li>
                <li>Multi-dimensional data presentation</li>
                <li>Dimensionality-Reduction Method</li>
                <li>
                  Large-scale data processing: incremental algorithms, parallel
                  and distributed algorithms.
                </li>
                <li>Image and text processing.</li>
                <li>Information visualization</li>
              </ul>
            </div>
          </div>
        )}

        {toggleState === 4 && (
          <div className="depart-data">
            <div className="title">INFORMATION SYSTEM</div>
            <div className="sub-title">I. Introduction</div>
            <div className="content">
              Department of Information Systems and Applied Mathematics,
              formerly known as Department of Informatics, was established in
              1990 simultaneous with the foundation of Center of Informatics and
              Electronics, the original name of the College of Information and
              Communication Technology (CICT). In 1997, Department of
              Information Systems (IS) was established.
              <br />
              Currently, the IS has 11 staffs including of 01 Assoc. Prof., 04
              PhDs., and 06 Masters who were graduated in developed countries
              (e.g., France, Germany, the Netherlands, and Australia). There are
              02 PhD candidates studying in France and 02 postdocs working in
              England.
              <br />
              The IS has 01 PhD program, 01 master program, and 01 undergraduate
              program in Information Systems. In training, besides teaching at
              Can Tho University, we have also supported for many other
              universities, community colleges, and IT centers in the Mekong
              Delta region.
              <br />
              In research, we have lead, joined, reviewed, and consulted for
              projects in many levels such as university, province/city, and the
              government. We have published papers in both International and
              National Conferences/Journals. Some papers have been indexed in
              ISI/Scopus.
              <br />
              In long-life studying, we usually join the international and
              national conferences to update new knowledge. All staffs are
              encouraged to join the training courses in IT, English, and
              teaching skills.
            </div>
            <div className="sub-title">Responsibilities</div>
            <div className="content">
              <ul>
                Research topics:
                <li>Information Retrieval</li>
                <li>Information visualization</li>
                <li>Automated text sumarization</li>
                <li>Document classification</li>
                <li>Knowledge Discovery and Data Mining</li>
                <li>Pattern recognition</li>
                <li>Decision support systems</li>
                <li>Recommender systems</li>
                <li>E-learning</li>
              </ul>
            </div>
          </div>
        )}

        {toggleState === 5 && (
          <div className="depart-data">
            <div className="title">Computer Networks And Communication</div>
            <div className="sub-title">I. Introduction</div>
            <div className="content">
              The Department of Computer Networks and Communication (DoCNC),
              College of Information and Communication Technology (CICT) was
              established in 1998 with 17 lecturers. Among these 17 lecturers
              are 06 Doctor Degree holders, 06 PhD candidates, and 05 Master
              Degree holders.
            </div>
            <div className="sub-title">II. Mission</div>
            <div className="content">
              <ul>
                <li>
                  Offer the Bachelor of engineering study program in Computer
                  Networks and Data Communication
                </li>
                <li>
                  Participate in the training activities of the postgraduate
                  programs in the fields of Computing and Information Technology
                </li>
                <li>
                  Conduct research; cooperating, supporting, consulting and
                  technology transferring in the field of Computer Networks and
                  Communication with partners in the Mekong Delta and the
                  Southern Region of Vietnam.
                </li>
              </ul>
            </div>
          </div>
        )}

        {toggleState === 6 && (
          <div className="depart-data">
            <div className="title">Information Technology</div>
            <div className="sub-title">I. Introduction</div>
            <div className="content">
              Welcome to the Department of Information Technology (DoIT) at
              College of Information and Communication Technology, Can Tho
              University. DoIT was founded in 2013. Our high quality programs
              attract stellar students and lecturers from the Mekong Delta and
              the Southern Region of Vietnam. We are proud of our strong
              tradition of collaboration with academic partners and industry.
              Many of the graduates of our programs are actively contributing to
              the development of society in academia, industry and government.
            </div>
            <div className="sub-title">II. Research</div>
            <div className="content">
              DoIT is in charge of managing 02 Bachelor of engineering study
              programs in Information Technology (01 Bachelor of engineering
              study program in Information Technology taught in Vietnamese, 01
              high-quality Bachelor of engineering study program in Information
              Technology taught in English); participating in the training
              activities of the postgraduate programs in CICT in the fields of
              computing and information technology; conducting research;
              cooperating, supporting, consulting and technology transferring in
              the field of information technology with partners in the Mekong
              Delta and the Southern Region of Vietnam.
              <br />
              Our research focuses on the areas of network security, multimedia
              data indexing and search, GIS and mobile information systems.
              <br />
              DoIT’s main objective towards the year 2025 is to become a strong
              department in education, scientific research and technology
              transfer in Vietnam as well as the Southeast Asia.
              <br />
              We always welcome and appreciate the cooperation and support from
              domestic and foreign agencies, enterprises and partners in order
              to increase the scale, improve the quality of training, research
              and technology transfer in the field of Information Technology.
            </div>
          </div>
        )}

        {toggleState === 7 && (
          <div className="depart-data">
            <div className="title">Applied Informatics</div>
            <div className="sub-title">I. Introduction</div>
            <div className="content">
              The Department of Applied Informatics (DAI) is constituted of 17
              members: 16 senior and junior lecturers (05 doctors, 11 masters)
              and 01 technician. It is composed of two specialized divisions:
              Fundamental Informatics and Applied Information Systems.
            </div>
            <div className="sub-title">II. Mission</div>
            <div className="content">
              In line with the Information & Communications Technology (CICT)
              College’s mission, the department is dedicated to the advancement
              of interdisciplinary-related knowledge technologies and real-world
              applications. In addition to lecturing basic informatics-related
              courses to a vast spectrum of first/second-year students in Can
              Tho University, DAI particularly delivers an high-quality engineer
              program in applied informatics. Apart from academic activities,
              DAI's staffs are highly motivated in real-life projects,
              especially implementing and supplying information technology (IT)
              solutions for industrial/business organizations.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Department;
