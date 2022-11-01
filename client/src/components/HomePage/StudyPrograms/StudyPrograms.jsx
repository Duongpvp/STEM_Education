import ListIcon from "@mui/icons-material/List";
import { Button, Drawer } from "@mui/material";
import NavigationMenu from "components/NavigationMenu/NavigationMenu";
import React, { useState } from "react";
import "./StudyPrograms.css";

const StudyPrograms = () => {
  const [toggleState, setToggleState] = useState(1);

  const handleTabs = (index) => {
    setToggleState(index);
  };
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsOpenDrawer(open);
  };
  return (
    <div className="study-programs">
      <div className="nav-bot-right-menu">
        <NavigationMenu />
      </div>
      <div className="study-programs-header">Study Programs</div>
      <div className="study-programs-content">
        <React.Fragment>
          <ListIcon onClick={toggleDrawer(true)}/>
          <Drawer
            anchor={"left"}
            open={isOpenDrawer}
            onClose={toggleDrawer(false)}
          >
            <Button id="study-programs-menu-item" onClick={() => handleTabs(1)} >SOFTWARE ENGINEERING</Button>
            <Button id="study-programs-menu-item" onClick={() => handleTabs(2)} >
              Computer Networks And Data Communication
            </Button>
            <Button id="study-programs-menu-item" onClick={() => handleTabs(3)} >COMPUTER SCIENCE</Button>
            <Button id="study-programs-menu-item" onClick={() => handleTabs(4)} >INFORMATION SYSTEM</Button>
            <Button id="study-programs-menu-item" onClick={() => handleTabs(5)} >
              Information Technology
            </Button>
            <Button id="study-programs-menu-item" onClick={() => handleTabs(6)} >Applied Informatics</Button>
          </Drawer>
        </React.Fragment>
        <div className="study-programs-nav">
          <ul>
            <li
              onClick={() => handleTabs(1)}
              className={toggleState === 1 ? "tabs tabs-active" : "tabs"}
            >
              SOFTWARE ENGINEERING
            </li>
            <li
              onClick={() => handleTabs(2)}
              className={toggleState === 2 ? "tabs tabs-active" : "tabs"}
            >
              Computer Networks And Data Communication
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
              Information Technology
            </li>
            <li
              onClick={() => handleTabs(6)}
              className={toggleState === 6 ? "tabs tabs-active" : "tabs"}
            >
              Applied Informatics
            </li>
          </ul>
        </div>
        {toggleState === 1 && (
          <div className="study-programs-data">
            <div className="title">
              The Bachelor Of Engineering In Software Engineering (BESE)
              Programme
            </div>
            <div className="sub-title">I. Introduction</div>
            <div className="content">
              The Bachelor of Engineering in Software Engineering (BESE)
              programme offered by DoSE started in 2007 and the last updated in
              2019. This programme is among a few undergraduate programmes in
              the field of software development for computers in information
              technology in Vietnam.
              <br />
              To be accredited according to an international standard in
              education and training, CTU issued Decision 1254/QD-DHCT dated
              April 26, 2019 on the establishment of self-assessment team
              according to the AUN-QA standard for the BESE programme. The DoSE
              performed different activities to review the results of related
              work in 2018 and self-assess the BESE programme according to the
              AUN-QA criteria Version 3.
            </div>
            <div className="sub-title">II. Programme Objectives</div>
            <div className="content">
              Based on the goals of Vietnam's higher education in Vietnam's
              Education Law (Regulation 39), CTU set its vision and mission.
              CICT’s mission and vision are developed to be aligned with the
              CTU’s mission and vision. The BESE programme has been built with
              programme objectives (POs) and expected learning outcomes (ELOs)
              in alignment with the vision and mission of both CTU and CICT.
              <ul>
                The Bachelor of Engineering in Software Engineering (BESE)
                programme has the following objectives:
                <li>
                  <br />
                  PO1: To train students to have health, ethics, professional
                  responsibility and social responsibility.
                </li>
                <li>
                  PO2: To equip students with fundamental knowledge of the
                  theoretical basis of mathematics, science and technology
                  relevant to Software Engineering.
                </li>
                <li>
                  PO3: To equip students with solid specialized knowledge and
                  skills to satisfy various tasks related to analysis, design,
                  implementation, testing and maintenance of software systems,
                  software project management and career development to high
                  positions, and holding a leadership role.
                </li>
                <li>
                  PO4: To equip students with foundation knowledge and skills to
                  develop embedded & IoT software systems, business software, or
                  simulation software.
                </li>
                <li>
                  PO5: To train students to have professional behavior,
                  communication skills, teamwork skills, lifelong learning
                  skills, scientific research, adaptability and working in the
                  field of software engineering inside the country and abroad.
                </li>
              </ul>
            </div>
          </div>
        )}

        {toggleState === 2 && (
          <div className="study-programs-data">
            <div className="title">
              Computer Networks And Data Communication
            </div>
            <div className="sub-title">I. TRAINING PROGRAM</div>
            <div className="content">
              <ul>
                <li>
                  Name of the program: Computer Networks and Data Communication
                </li>
                <li>Code: 7480102</li>
                <li>Type of training: Regular</li>
                <li>Training time: 4.5 years (up to 9 years)</li>
                <li>Degree title: Engineer</li>
                <li>
                  Training unit: Department of Computer Networks and
                  Communication, College of Information and Communication
                  Technology
                </li>
              </ul>
            </div>
            <div className="sub-title">II. Program Objectives</div>
            <div className="content">
              <ul>
                Based on Vietnam’s law on higher education, the BECNDC has its
                objectives (POs) aligned with CTU’s mission. After graduation
                from the BECNDC program, students will:
                <li>
                  <br />
                  PO1: Memorize basic knowledge of law, security and defense,
                  political and social science; build physical health, ethics,
                  social awareness, and professional responsibility according to
                  current regulations;
                </li>
                <li>
                  PO2: Present basic knowledge of mathematics and science
                  applicable in computer network and data communication;
                </li>
                <li>
                  PO3: Integrate fundamental knowledge and skills in computer
                  science and information technology that enable them to study
                  related fields or graduate programmes;
                </li>
                <li>
                  PO4: Analyze and apply specialized knowledge and skills to
                  meet practical needs of an individual or an organization in
                  the field of computer network and data communication in the
                  context of Industry 4.0;
                </li>
                <li>
                  PO5: Develop communication skills, presentations skills,
                  teamwork skills, foreign language competence, professional and
                  creative working style, and entrepreneurship to meet the
                  requirements of globalization and lifelong learning.
                </li>
              </ul>
            </div>
          </div>
        )}

        {toggleState === 3 && (
          <div className="study-programs-data">
            <div className="title">Computer Science</div>
            <div className="sub-title">I. Introduction</div>
            <div className="content">
              <ul>
                OBJECTIVES AND OUTPUTSTANDARDS OF THECURRICULUM
                <li>Field of Study: Computer Science</li>
                <li>Discipline Code: 52480101</li>
                <li>Types of training: Formal</li>
                <li>Period of Training: 4.5 years</li>
                <li>
                  Management Unit: The College of Information and Communications
                  Technology - Can Tho University
                </li>
                <li>Department: Computer Science</li>
              </ul>
            </div>
            <div className="sub-title">II. Training Objectives</div>
            <div className="content">
              Training computer science engineers with extensive knowledge of
              computer science to apply their skills in real-world problems.
              After graduating, students will have a solid knowledge in one of
              the specialized subfields: Intelligent systems, Machine learning &
              Data mining, Graphics & Computer vision, Safety & security
              information, and Modeling & system evaluation. Students will have
              ability to develop their thinking from theory to the reality of
              building intelligent systems, and capability of applying research
              into practice as well as the ability to participate in research
              projects and develop the field of computer science.
            </div>
          </div>
        )}

        {toggleState === 4 && (
          <div className="study-programs-data">
            <div className="title">Information Systems</div>
            <div className="sub-title">I. Introduction</div>
            <div className="content">
              <ul>
                PROGRAM OBJECTIVES AND LEARNING OUTCOMES
                <li>Field of study: Information Systems</li>
                <li>Code:52480104</li>
                <li>Program Delivery Mode: Full time</li>
                <li>Time of study: 4.5 years</li>
                <li>Faculty: Information and Communication Technology</li>
                <li>Department: Information Systems</li>
              </ul>
            </div>
            <div className="sub-title">II. Program objectives</div>
            <div className="content">
              After graduating with a degree of Engineering in Information
              Systems, students can achieve excellent personal ethics, good
              logic thought, and necessary specialist knowledge in information
              technology as well as in other related fields (e.g., economics and
              management) to become experts in Information Systems in different
              environments such as in education, government, and enterprises.
            </div>
          </div>
        )}

        {toggleState === 5 && (
          <div className="study-programs-data">
            <div className="title">Information Technology</div>
            <div className="sub-title">I. Introduction</div>
            <div className="content">
              <ul>
                PROGRAM SPECIFICATION
                <li>Academic program:Information Technology</li>
                <li>Code: 52480201</li>
                <li>Training type:Regular</li>
                <li>Training duration: 4,5 years</li>
                <li>Degree: Engineer</li>
                <li>
                  Managed by: Department of Information Technology, College of
                  Information and Communication Technology, Can Tho University
                </li>
              </ul>
            </div>
            <div className="sub-title">II. Program objectives (POs)</div>
            <div className="content">
              <ul>
                The general objectives of the Bachelor of Engineering in
                Information Technology program are to educate students to become
                high-quality Information Technology (IT) engineers with good
                health, ethical behavior, solid knowledge and fluent skills to
                be able to utilize IT products and solutions, to take on
                appropriate professional positions in IT and grow into
                leadership positions or pursue research or graduate studies in
                the field. Specifically, after graduation a student should be
                able to:
                <li>
                  <br /> PO1: Have good health and ethical behavior.
                </li>
                <li>
                  PO2: Have solid knowledge and state-of-the-art IT solutions.
                </li>
                <li>
                  PO3: Have fundamental knowledge of mathematics, science and
                  technology appropriate to the discipline.
                </li>
                <li>
                  PO4: Explain and apply appropriate fundamental knowledge and
                  information technologies to employ appropriate methodologies
                  to help an individual or organization achieve its goals and
                  objectives.
                </li>
                <li>
                  PO5: Have an ability to communicate in English or French, read
                  and comprehend documents written in English or French.
                </li>
              </ul>
            </div>
          </div>
        )}

        {toggleState === 6 && (
          <div className="study-programs-data">
            <div className="title">Applied Informatics</div>
            <div className="sub-title">Introduction</div>
            <div className="content">
              <ul>
                <li>Major: Information Technology</li>
                <li>Speciality: Applied Informatics</li>
                <li>Major code: 52480201</li>
                <li>Program type: Full time</li>
                <li>Duration of study: 4,5 years</li>
                <li>College: Information Technology and Communication</li>
                <li>Department: Applied Informatics</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyPrograms;
