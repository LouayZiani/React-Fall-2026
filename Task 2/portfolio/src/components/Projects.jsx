function Projects() {
  return (
    <section className="projects" id="projects">
      <h2>Projects</h2>

      <div className="project-list">

        <article className="project">
          <h3>SilentScript: Real-Time Gesture Recognition</h3>

          <p>
            Built a computer vision pipeline using Python, OpenCV, and KNN to classify 8+ hand gestures with ~90% accuracy, achieving robust real-time recognition under varying lighting conditions.
          </p>
        </article>

        <article className="project">
          <h3>Braille-Inspired Multi-Modal Feedback via Acoustic Levitation</h3>

          <p>
            Developed and validated an acoustic levitation system with multi-sensory feedback, applying deep learning for frequency optimization and accessibility-focused haptic design.
          </p>
        </article>

        <article className="project">
          <h3>NeuroStar: AR Cognitive Engagement Game</h3>

          <p>
            AR shooter game designed for NASA Space Apps Challenge, integrating Unity, LightShip, and NavMesh to deliver real-time spatial tracking and multi-mechanic gameplay aimed at reducing astronaut stress in isolated environments.
          </p>

          <a
            href="https://github.com/LouayZiani/NeuroStar"
            target="_blank"
            rel="noreferrer"
          >
            [GitHub]
          </a>
        </article>

        
        <article className="project">
          <h3>Medical AI: Blood Cell Detection</h3>

          <p>
            Created YOLOv8-based models to detect RBC, WBC, and Platelets with advanced preprocessing, augmentation, and real-time Gradio deployment, achieving robust performance gains over classical baselines
          </p>

          <a
            href="https://github.com/LouayZiani/CV-Spring-2026/tree/main/checkpoint2"
            target="_blank"
            rel="noreferrer"
          >
            [GitHub]
          </a>
        </article>

      </div>
    </section>
  );
}

export default Projects;