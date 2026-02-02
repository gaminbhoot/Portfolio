import { Link } from "react-router-dom";
import ProfileCard from "../components/profile/ProfileCard";

const About = () => {
  return (
    <div className="container mx-auto px-10 pt-1 text-white">
      <div className="flex flex-col lg:flex-row items-start gap-16 w-full">
        
        {/* LEFT: Text Content */}
        <div className="flex-1 max-w-xl">
          <h1 
            /* Reduced mb-8 to mb-2 to bring the paragraph right under the title */
            className="text-6xl font-bold mb-2 uppercase text-white tracking-tight" 
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            ABOUT ME
          </h1>

          {/* Added mt-0 and tightened text size slightly */}
          <p className="text-m text-gray-300 leading-relaxed mt-0">
            I’m a computer science student focused on building practical, scalable software solutions. My interests lie in applied problem-solving, where I translate ideas into functional, user-centric applications.
            I’ve worked on multiple development projects involving structured UI design and implementation of efficient workflows. I approach development with an engineering mindset—clarity over cleverness, fundamentals over shortcuts.
            Currently, I’m sharpening my technical depth while preparing to transition from academic projects to industry-grade systems and professional development environments.
          </p>
        </div>

        {/* RIGHT: Profile Card */}
        <div className="flex-1 flex justify-center lg:justify-end">
          {/* Using a slight negative margin to keep the card perfectly level with the text top */}
          <div className="lg:-mt-1"> 
            <ProfileCard
              name="Jay Joshi"
              title="B.Tech Computer Science Student"
              handle="gaminbhoot"
              status="Online"
              contactText="Contact Me"
              avatarUrl="/jay1.png"
              showUserInfo={true}
              enableTilt={true}
              enableMobileTilt={false}
              onContactClick={() => alert("+91 97971 ")}
              showIcon
              showBehindGlow
              behindGlowColor="rgba(125, 190, 255, 0.67)"
              customInnerGradient="linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;