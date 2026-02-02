  import { Link } from "react-router-dom";
  import ProfileCard from "../components/profile/ProfileCard";
  import DecryptedText from "../components/DecryptedText";


  const About = () => {
    return (
      <div className="container mx-auto px-6text-white">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* LEFT: About content */}
          <div className="flex-1 max-w-xl">
            <h1 className="text-5xl font-bold mb-6">
            <DecryptedText
              text="About Me"
              animateOn="view"
              sequential
              parentClassName="font-display tracking-widest"
              className="font-display text-white"
              encryptedClassName="font-display text-indigo-400"
            />
          </h1>


            <p className="text-xl text-gray-300 mb-8">
              This is a separate page. Notice how the background didn’t reload?
              That’s the power of React Router.
            </p>

            
          </div>

          {/* RIGHT: Profile Card */}
          <div className="flex-1 flex justify-center lg:justify-end">
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
              onContactClick={() =>alert("+91 97971 ")}
              showIcon
              showBehindGlow
              behindGlowColor="rgba(125, 190, 255, 0.67)"
              customInnerGradient="linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)"
            />

          </div>

        </div>
      </div>
    );
  };

  export default About;
