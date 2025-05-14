// Portfolio.js (updated layout in black theme)
import React, { useState, useEffect } from "react";
import MyButton from "./components/ui/Button";
import './App.css';


const projects = [
  {
    title: "Minirel: A Mini Relational Database System",
    description: `• Designed and implemented a mini relational database system (Minirel) from scratch, following database architecture principles, including buffer management, indexing, and query processing.<br>
• Built a query execution engine supporting SQL-like operations, including selection, projection, and join algorithms.<br>
• Designed a storage manager for disk-based data organization and optimized page replacement with LRU and Clock algorithms.`,
    image: "/dbmsgit.jpeg",
    link: "https://github.com/muskanpardasani/CS564_DatabaseManagement",
    tech: ["C++", "File I/O", "Data Structures"]
  },
  {
    title: "Multimodal Model Adaptation for Medical Imaging",
    description: `• Achieved a 63% accuracy boost (from CLIP 49.89% to CoOp 81.47%) by leveraging lightweight adaptation techniques
such as prompt tuning (CoOp) and CLIP Adapter, proving their effectiveness over domain-specific pretraining.<br>
• Demonstrated that prompt tuning (CoOp) outperforms multimodal fine-tuning, revealing that textual alignment is key
for domain adaptation. CLIP Adapter improved accuracy (77.80%-78.03%), but lacked in vision-language adaptation.<br>
(NLP, Python, VLMs)`,
    image: "/nlpgit.jpeg",
    link: "https://github.com/muskanpardasani/CS-769-Final-Project",
    tech: ["Python", "LLMs", "VLMs"]
  },
  {
    title: "Off Policy Evaluation for Fitted Q Evaluation (Reinforcement Learning) (Ongoing)",
    description: `• Implemented Fitted Q-Evaluation (FQE) to assess policy performance in off-policy evaluation (OPE).<br>
• Exploring option-based FQE, extending traditional FQE to hierarchical decision-making structures. Analyzing
preliminary results to validate the effectiveness of this approach in policy assessment.`,
    image: "/rl.jpg",
    tech: ["Reinforcement Learning", "FQE", "Python"]
  },
  {
    title: "Label Efficient Learning with Generative Examples",
    description: `• Proposed innovative metrics for active and semi-supervised learning using diffusion-generated images, resulting in the
elimination of manual labeling for over 50% of unlabelled data. <br>
• Executed a fusion of CLIP and Stable Diffusion models, coupled with an image degradation component, resulting in
 a 15% improvement in performance metrics.`,
 
 tech: ["CLIP", "Stable Diffusion", "Semi-supervised Learning"],
    image: "/label efficient learning.png",
    drive: "https://drive.google.com/file/d/1TPEFxvs5CkL-QrGBMgaK0MMfa9OZCuCh/view?usp=sharing"
  }
];




export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [copied, setCopied] = useState(false);
  const [showZoomed, setShowZoomed] = useState(false);


  const handleCopy = () => {
    navigator.clipboard.writeText("muskanpardasani27@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  useEffect(() => {
    const modal = document.getElementById('zoomed-profile');
    if (modal && showZoomed) {
      modal.showModal();
    } else if (modal) {
      modal.close();
    }
  }, [showZoomed]);
  useEffect(() => {
    
    const gradcap = document.getElementById('gradcap-icon');
    const educationSection = document.getElementById('education');
    const blocks = educationSection?.querySelectorAll('.edu-block');

    function updateGradcapPosition() {
      if (!gradcap || !educationSection || !blocks.length) return;
      const sectionTop = educationSection.getBoundingClientRect().top + window.scrollY;
      const blockOffsets = [...blocks].map(block => block.getBoundingClientRect().top + window.scrollY);

      const visibleY = window.scrollY + window.innerHeight / 2;
      let nearest = blockOffsets[0];

      for (let i = 1; i < blockOffsets.length; i++) {
        if (Math.abs(visibleY - blockOffsets[i]) < Math.abs(visibleY - nearest)) {
          nearest = blockOffsets[i];
        }
      }

      gradcap.style.transform = `translateY(${nearest - sectionTop}px)`;
    }

    window.addEventListener('scroll', updateGradcapPosition);
    updateGradcapPosition();
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    revealElements.forEach(el => observer.observe(el));
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = document.body.scrollHeight;

    const mouse = { x: null, y: null };
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY + window.scrollY;
    });

    const colors = ['#00FFFF', '#FF00FF', '#00FF00', '#FF4500', '#FFD700'];
    const particles = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      dx: (Math.random() - 0.5) * 1.2,
      dy: (Math.random() - 0.5) * 1.2,
      radius: 2 + Math.random() * 2.5,
      pulse: Math.random() * Math.PI * 2,
      hue: Math.floor(Math.random() * 360),
      connections: []
    }));

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.pulse += 0.05;
        const pulseRadius = p.radius + Math.sin(p.pulse) * 0.5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, pulseRadius, 0, 2 * Math.PI);
        ctx.fillStyle = `hsl(${p.hue}, 80%, 60%)`;
        ctx.shadowColor = '#22D3EE';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;

        let dx = p.dx;
        let dy = p.dy;
        const distX = p.x - mouse.x;
        const distY = p.y - mouse.y;
        const distance = Math.sqrt(distX * distX + distY * distY);
        if (distance < 120 && distance > 0) {
          dx += (distX / distance) * 1.2;
          dy += (distY / distance) * 1.2;
        }
        p.x += dx;
        p.y += dy;

        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = 'rgba(56,189,248,0.06)';
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    }

    draw();

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = document.body.scrollHeight;
    });
  }, []);

  return (
    <div className="min-h-screen text-white font-sans flex flex-col md:flex-row relative overflow-hidden select-none" onContextMenu={(e) => e.preventDefault()}>
      <canvas id="bg-canvas" className="absolute inset-0 z-0"></canvas>
      <div className="absolute inset-0 z-0 animate-gradient-bg bg-gradient-to-r from-purple-900 via-black to-purple-900 opacity-40"></div> 

      {/* Sidebar */}
      <aside className="bg-zinc-900 text-white w-full md:w-80 p-6 flex flex-col items-center rounded-tr-none md:rounded-br-3xl shadow-xl">
      <img
  src="/muskan.jpg"
  alt="Portrait of Muskan Pardasani"
  className="w-56 h-56 rounded-full mb-4 object-cover shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300"
  onClick={() => setShowZoomed(true)}
/>

       

  <h1 className="text-2xl font-bold mb-1">Muskan Pardasani</h1>
  <p className="text-sm bg-zinc-800 px-3 py-1 rounded-full text-center mb-6">AI/ML & Data Science</p>

  {/* Email & Location */}
  <div className="text-sm w-full mb-4 relative">
  <h3 className="text-zinc-400 uppercase text-xs mb-1">Email</h3>
  <div
    onClick={handleCopy}
    className="flex items-center gap-2 text-zinc-300 hover:underline hover:text-white transition cursor-pointer"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
      className="w-5 h-5 text-zinc-300"
    >
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2v.01L12 13 4 6.01V6h16zM4 18V8.99l8 6 8-6V18H4z" />
    </svg>
    <span className="text-zinc-300">muskanpardasani27@gmail.com</span>
  </div>

  {copied && (
    <div className="absolute top-0 right-0 mt-6 bg-white text-black text-xs px-2 py-1 rounded shadow-md animate-fade-in-out">
      Copied to clipboard!
    </div>
  )}
</div>



  <div className="text-sm w-full mb-4">
    <h3 className="text-white uppercase text-xs mb-1">Location</h3>
    <p>San Jose, California</p>
  </div>

  {/* Socials & Resume */}
  <div className="text-xs text-zinc-500 flex flex-col items-center gap-2 mt-6 z-10">
    <div className="flex gap-4">
      <a
        href="https://github.com/muskanpardasani"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        className="inline-flex items-center justify-center w-9 h-9 rounded hover:bg-zinc-800 transition text-white"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.207 11.387.6.11.793-.26.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.729.083-.729 1.204.085 1.838 1.236 1.838 1.236 1.07 1.833 2.807 1.303 3.492.996.108-.775.42-1.303.762-1.602-2.665-.303-5.466-1.332-5.466-5.93 0-1.31.47-2.38 1.236-3.22-.123-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.552 3.296-1.23 3.296-1.23.655 1.653.243 2.873.12 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.803 5.624-5.475 5.922.432.372.816 1.102.816 2.222v3.293c0 .32.192.694.8.576C20.565 21.797 24 17.298 24 12c0-6.63-5.37-12-12-12Z" />
        </svg>
      </a>

      <a
        href="https://linkedin.com/in/muskanpardasani"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className="inline-flex items-center justify-center w-9 h-9 rounded hover:bg-zinc-800 transition text-white"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14C2.24 0 0 2.24 0 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5V5c0-2.76-2.24-5-5-5zm-9 19H7V9h3v10zm-1.5-11.3c-.97 0-1.75-.79-1.75-1.75S7.53 4.2 8.5 4.2s1.75.79 1.75 1.75S9.47 7.7 8.5 7.7zM20 19h-3v-5.2c0-1.28-.46-2.15-1.62-2.15-.88 0-1.4.59-1.63 1.16-.08.2-.1.47-.1.75V19h-3s.04-9 0-10h3v1.42c.4-.61 1.1-1.48 2.68-1.48 1.96 0 3.43 1.28 3.43 4.03V19z" />
        </svg>
      </a>
    </div>

    <a
      href="https://drive.google.com/file/d/1XJsl2We7ep8j2vXEffHczgx1haz2apAe/view?usp=sharing"
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm text-white border border-white rounded-full px-3 py-1 hover:bg-white hover:text-black transition"
    >
      Resume
    </a>
  </div>
</aside>


      {/* Main Content */}
      <main className="flex-1 pt-32 px-4 md:px-12 relative z-10">

        {/* Top Navigation */}
        <nav className="fixed top-0 md:left-80 left-0 right-0 bg-black z-50 flex justify-center space-x-6 py-4 border-b border-zinc-800">
        <a href="#about" className="text-white hover:text-white transition">About</a>
          <a href="#education" className="text-zinc-300 hover:text-white transition">Education</a>
          <a href="#projects" className="text-white hover:text-white transition">Projects</a>
          <a href="#experience" className="text-zinc-300 hover:text-white transition">Experience</a>
          {/* <a href="#hobbies" className="text-zinc-300 hover:text-white transition">Hobbies</a> */}
          <a href="#contact" className="text-zinc-300 hover:text-white transition" onClick={(e) => { e.preventDefault(); const m = document.getElementById('contact-modal'); if (m) m.showModal(); }}>Contact</a>
        </nav>

        <div className="pt-32"> {/* padding to offset fixed nav */}

      {/* About */}
      <section id="about" className="scroll-mt-28 mb-16 animate-fade-up">
  <h2 className="text-4xl font-bold mb-6 text-white drop-shadow">About Me</h2>
  <div className="relative p-6 rounded-xl bg-black/70 backdrop-blur-md shadow-xl ring-1 ring-white/20 max-w-4xl text-white">
  <p className="text-zinc-200 leading-relaxed text-lg space-y-3">
  I'm a <span className="text-white font-medium">Machine Learning Engineer</span> passionate about building real-world solutions that scale. My work blends statistical modeling, optimization, and large-scale machine learning- often bridging theory with robust, production-ready tools.<br /><br />
  I recently completed my <span className="text-white font-medium">Master’s in Data Science</span> from the <span className="text-white font-medium">University of Wisconsin-Madison.</span> Before that, I earned my <span className="text-white font-medium">B.Tech in Electrical Engineering</span> from the <span className="text-white font-medium">Indian Institute of Technology, Indore. </span><br/><br/>

  I thrive at the intersection of <span className="text-white font-medium">GenAI</span>, <span className="text-white font-medium">optimization</span>, <span className="text-white font-medium">reinforcement learning</span>, and <span className="text-white font-medium">scalable infrastructure</span>, with experience spanning industry and research roles at places like <span className="text-white font-medium">C3 AI</span> and <span className="text-white font-medium">Bosch</span>.<br /><br />
  Outside of work, I enjoy sketching, traveling, and solving puzzles. I also mentor female undergrads in STEM fields through the{" "}
  <a
    href="https://www.housing.wisc.edu/undergraduate/communities/wise/"
    target="_blank"
    rel="noopener noreferrer"
    className="underline text-white hover:text-cyan-300"
  >
    WISE community
  </a>.
</p>

  </div>
</section>



        {/* Education */}
        <section id="education" className="scroll-mt-28 mb-16 animate-fade-up delay-300 reveal-on-scroll">
  <h2 className="text-3xl font-semibold mb-4">Education</h2>
  <div className="relative pl-6">
    
    <div id="gradcap-icon" className="absolute -left-6 top-0 w-6 h-6 z-10 text-2xl transition-transform duration-300 ease-in-out">🎓</div>
    <div className="space-y-14">
      <div className="relative edu-block">
        
        <div className="ml-6">
          <div className="flex items-center gap-4 mb-2">
            <img src="/uwmadison.png" alt="UW-Madison" className="w-16 h-16 rounded-full bg-white p-1" />
            <div>
              <p className="font-semibold text-lg">Master's - Data Science</p>
              <p className="text-sm text-white">University of Wisconsin–Madison · Aug 2023 – May 2025</p>
            </div>
          </div>
          <p className="text-sm text-white mb-1 font-semibold">Relevant Courses:</p>
          <div className="flex flex-wrap gap-2 mt-2">
  {[
    "Advanced Natural Language Processing",
    "Statistical Models, Methods, and Inferences",
    "Artificial Neural Networks",
    "Database Management Systems",
    "Optimization",
    "Statistical Learning",
    "Human Computer Interaction (HCI)"
  ].map((course, index) => (
    <span
      key={index}
      className="px-3 py-1 rounded-md border border-white/20 bg-white/5 backdrop-blur-sm text-white text-sm shadow-[0_0_4px_#ffffff20] transition-all duration-300 hover:scale-105 hover:bg-white/10"
    >
      {course}
    </span>
  ))}
</div>


          <p className="text-sm text-white mt-3 font-semibold">Co-curriculars:</p>
          <ul className="list-disc list-inside text-white text-sm">
            <li>Women in Stem Education (WISE)- Mentor</li>
          </ul>
        </div>
      </div>

      <div className="relative edu-block">
        
        <div className="ml-6">
          <div className="flex items-center gap-4 mb-2">
            <img src="/iiti.png" alt="IIT Indore" className="w-16 h-16 rounded-full bg-white p-1" />
            <div>
              <p className="font-semibold text-lg">B.Tech - Electrical Engineering</p>
              <p className="text-sm text-white">Indian Institute of Technology, Indore · July 2018 – June 2022</p>
            </div>
          </div>
          <p className="text-sm text-white mb-1 font-semibold">Relevant Courses:</p>
          <div className="flex flex-wrap gap-2 mt-2">
  {[
    "Digital Signal Processing",
    "Control Systems",
    "Object Oriented Programming",
    "Data Structures and Algorithms",
    "Probability and Statistics",
  ].map((course, index) => (
    <span
      key={index}
      className="px-3 py-1 rounded-md border border-white/20 bg-white/5 backdrop-blur-sm text-white text-sm shadow-[0_0_4px_#ffffff20] transition-all duration-300 hover:scale-105 hover:bg-white/10"
    >
      {course}
    </span>
  ))}
</div>
          <p className="text-sm text-white mt-3 font-semibold">Clubs & Societies:</p>
          <ul className="list-disc list-inside text-white text-sm">
            <li>Consulting, Finance, & Analytics Club- Co-Founder and President</li>
            <li>The Fine Arts Club</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>

       {/* Projects Section */}
<section id="projects" className="scroll-mt-28 mb-16 animate-fade-up delay-100">
  <h2 className="text-3xl font-semibold mb-4">Projects</h2>
  <div className="grid gap-6 md:grid-cols-2">
    {projects.map((proj, idx) => (
      <div
        key={idx}
        className="relative bg-zinc-800 rounded-lg shadow-lg overflow-hidden transition transform hover:scale-[1.02] cursor-pointer"
        onClick={() => setSelectedProject(proj)}
      >
        <img src={proj.image} alt={proj.title} className="h-40 w-full object-cover hover:brightness-90 transition" />
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2">{proj.title}</h3>
          {proj.tech && (
            <div className="flex flex-wrap gap-2 mt-2">
              {proj.tech.map((tech, i) => (
                <span key={i} className="bg-zinc-700 text-white px-2 py-1 rounded text-xs font-medium">
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    ))}
  </div>

  {selectedProject && (
    <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-zinc-900 p-6 rounded-2xl shadow-xl border border-zinc-800 max-w-md w-[90%]">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {selectedProject.emoji && (
              <span className="text-3xl animate-pulse drop-shadow-glow">
                {selectedProject.emoji}
              </span>
            )}
            <h3 className="text-xl font-bold text-white tracking-wide">
              {selectedProject.title}
            </h3>
          </div>
          <button
            className="text-zinc-400 hover:text-white text-lg ml-4"
            onClick={() => setSelectedProject(null)}
          >
            ✖
          </button>
        </div>
        <div
          className="text-zinc-300 text-sm leading-relaxed space-y-1"
          dangerouslySetInnerHTML={{ __html: selectedProject.description }}
        />
        {selectedProject.tech && (
          <div className="flex flex-wrap gap-2 mt-4">
            {selectedProject.tech.map((tech, i) => (
              <span key={i} className="bg-zinc-700 text-white px-2 py-1 rounded text-xs font-medium">
                {tech}
              </span>
            ))}
          </div>
        )}
        {selectedProject.drive ? (
          <>
            <img
              src={selectedProject.image}
              alt={selectedProject.title}
              className="mt-4 w-full h-40 object-cover rounded-xl border border-zinc-800 shadow-inner"
            />
            <p className="mt-2 text-sm text-cyan-400 underline text-center hover:text-cyan-300 transition">
              <a href={selectedProject.drive} target="_blank" rel="noopener noreferrer">
                Read more here ↗
              </a>
            </p>
          </>
        ) : selectedProject.link ? (
          <a
            href={selectedProject.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-4 group"
          >
            <img
              src={selectedProject.image}
              alt={selectedProject.title}
              className="w-full h-40 object-cover rounded-xl border border-zinc-800 shadow-inner group-hover:opacity-90 transition"
            />
            <p className="mt-2 text-sm text-cyan-400 underline text-center group-hover:text-cyan-300 transition">
              View on GitHub ↗
            </p>
          </a>
        ) : (
          <img
            src={selectedProject.image}
            alt={selectedProject.title}
            className="mt-4 w-full h-40 object-cover rounded-xl border border-zinc-800 shadow-inner"
          />
        )}
      </div>
    </div>
  )}
</section>


      {/* Experience */}
<section id="experience" className="scroll-mt-28 mb-16 animate-fade-up delay-200">
  <h2 className="text-3xl font-semibold mb-4">Experience</h2>

  <div className="grid md:grid-cols-2 gap-6"> 
    {[
      {
        title: "C3 AI- Data Science Intern",
        duration: "June'24 – Aug'24",
        image: "/c3ai.png",
        summary: "Built GenAI tools and optimization pipelines for LLMs deployed at scale. Click for more.",
        description: `• Optimized C3 AI’s proprietary LLM, Sawshark, using statistical modeling and data optimization, boosting prediction
    accuracy for client specific models from 16% to 92% with Python, OpenAI, PyTorch, and Scikit-learn.<br>
    • Developed a production-ready generative AI model for sugar industry clients, increasing productivity by 50%, enabling
multi-industry expansion through transformer-based architectures and retrieval-augmented generation (RAG). <br>
    •Integrated LLMs with optimization models, enhancing inference efficiency and reducing execution time by 20%.`
      },
      {
        title: "Bosch- AI/ML Software Engineer",
        duration: "Aug'22 – June'23",
        image: "/bosch.jpeg",
        summary: "Created AI dashboards, automated pipelines, and collaborated with global dev teams. Click for more.",
        description: `• Built a recommendation system that optimized product suggestions, increasing engagement by 25%, using Scikit-learn,
Python, and Flask APIs.<br>
• Automated data pipelines, reduced manual intervention by 30%, using SQL and AWS. <br>
• Developed and deployed production-grade AI models and a predictive analytics dashboard used by 125+ global teams
that seamlessly integrated with Bosch’s existing platforms, leveraging Python.`
      },
      {
        title: "Ciphense Inc- Machine Learning Intern",
        duration: "April'21 – June'21",
        image: "/ciphense.png",
        summary: "Built an AI chatbot to deliver fast, accurate institute-related answers. Click for more.",
        description: `• Designed and deployed a context-aware chatbot using Rasa NLU and Flask, capable of handling natural language queries related to institutional resources and policies.<br>
• Ensured smooth interaction between the chatbot frontend and backend services by collaborating across full-stack teams for efficient API integration. <br>
• Optimized intent classification and entity recognition to improve response accuracy and user engagement.<br>
• Deployed the chatbot on a web interface, enabling instant access to updated academic, administrative, and event-related content.`
      }
    ].map((exp, idx) => (
      <div
        key={idx.title}
        className="relative bg-zinc-800 rounded-lg shadow-md p-4 flex items-start gap-4 cursor-pointer hover:scale-[1.02] transition"
        onClick={() => setSelectedProject(exp)}
      >
        <img src={exp.image} alt={exp.title} className="w-12 h-12 object-contain" />
        <div className="flex flex-col">
          <h4 className="font-bold text-white text-base leading-snug">{exp.title}</h4>
          <p className="text-sm text-zinc-400">{exp.duration}</p>
          <p className="text-zinc-300 text-sm">{exp.summary}</p>
        </div>
      </div>
    ))}
    
  </div>
   {/* Teaching Experience Subsection */}
  <div className="mt-12">
    <h3 className="text-xl font-semibold mb-4">Teaching Experience</h3>
    <div className="grid md:grid-cols-2 gap-6">
      {[
        {
          title: "Teaching Assistant- Physics",
          duration: "Jan 2025 – May 2025",
          image: "/uwmadison.png",
          summary: "Led sections for 2 different courses. Click for more.",
          description: `• Led discussion sections and graded assignments for 2 different physics courses simultaneously. <br>
          • Held weekly office hours, assisting students with electrostatics, magnetism, optics, and Physics of sports and daily life. <br>
         `
        },
        {
          title: "Teaching Assistant- Mathematics",
          duration: "Aug 2024 – Dec 2024",
          image: "/uwmadison.png",
          summary: "Assisted with course material and led discussions on Calculus. Click for more.",
          description: `• Led weekly discussion sections for 50+ students, graded quizzes and exams, and conducted office hours. <br>
          • Facilitated student understanding of derivatives, integration and the fundamentals of calculus.`
        }
      ].map((exp, idx) => (
        <div key={idx} className="relative bg-zinc-800 rounded-lg shadow-md p-4 flex items-start gap-4 cursor-pointer hover:scale-[1.02] transition" onClick={() => setSelectedProject(exp)}>
          <img src={exp.image} alt={exp.title} className="w-12 h-12 object-contain" />
          <div className="flex flex-col">
            <h4 className="font-bold text-white text-base leading-snug">{exp.title}</h4>
            <p className="text-sm text-zinc-400">{exp.duration}</p>
            <p className="text-zinc-300 text-sm">{exp.summary}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>



        {/* Hobbies / Fun Facts */}
        {/* <section id="hobbies" className="scroll-mt-28 mb-20 animate-fade-up delay-400">
          <h2 className="text-3xl font-semibold mb-4">Hobbies & Fun Facts</h2>
          <ul className="list-disc list-inside text-white space-y-1">
            <li>I’ve played Keyboard for many years (sometimes like a right handed person (I'm not) or sometimes cross handed).</li>
            <li>Tell me your birthday once and I'll remember it for the rest of my life (no calendars needed!).</li>
            <li>Can identify a known song very very quickly. Friends call me Shazam. </li>
            <li>Die-hard Comedy fan, open to open mic gigs for my weekends</li>
            <li>My favorite AI topic? Reinforcement learning!</li>
          </ul>
        </section> */}

        {/* Contact / Resume */}
        <section id="contact" className="scroll-mt-28 mb-20 animate-fade-up delay-500">
        <dialog
  id="contact-modal"
  className="backdrop:bg-black/70 rounded-xl max-w-md w-[90%] text-white bg-zinc-900 border border-zinc-700 shadow-xl"
>
  <div className="p-6"> {/* This div ensures padding inside the dialog */}
    <form method="dialog" className="text-right">
      <button className="text-zinc-500 hover:text-white text-sm">✕</button>
    </form>
    <h3 className="text-2xl font-semibold mb-4">Contact Details</h3>
    <p className="text-zinc-300 break-words">Email: muskanpardasani27@gmail.com</p>
    <p className="text-zinc-300">Location: San Jose, California</p>
  </div>
</dialog>
<h3 className="text-2xl font-semibold mb-4">Let's Connect!</h3>
          <p className="text-white ">  I'm always excited about taking on new challenges and contributing to impactful projects. Feel free to get in touch, or grab my resume below:
          </p>
          <div className="mt-4 flex justify-center">
            <MyButton />
          </div>
        </section>

        </div>
      </main>
 
    </div>
  );
}


