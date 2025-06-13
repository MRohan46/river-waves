function toggleDetails(el){
  el.classList.toggle('active');
  const d = el.querySelector('.details');
  d.style.display = el.classList.contains('active') ? 'block' : 'none';
}
document.querySelectorAll('.faq-item h4').forEach(h=>{
  h.onclick = ()=> h.nextElementSibling.style.display = h.nextElementSibling.style.display==='block'?'none':'block';
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
      observer.unobserve(entry.target); // Animate once
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.step-block, .mv-card, .service-card, .why-card, .card, .faq-item, .project-card, .filter-buttons').forEach((block, index) => {
  block.style.transitionDelay = `${index * 0.1}s`;
  observer.observe(block); 
});

document.querySelectorAll('.faq-question').forEach((btn) => {
    btn.addEventListener('click', () => {
      const parent = btn.parentElement;
      const answer = parent.querySelector('.faq-answer');
      const icon = btn.querySelector('i');

      parent.classList.toggle('open');
      answer.style.maxHeight = parent.classList.contains('open') ? answer.scrollHeight + "px" : null;
      icon.setAttribute("data-lucide", parent.classList.contains('open') ? "minus" : "plus");
      lucide.createIcons();
    });
  });
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000); // Auto-hide after 3 sec
}
const steps = document.querySelectorAll(".step");
const nextBtn = document.getElementById("nextBtn");
const sendEmailBtn = document.getElementById("sendEmail");
if (sendEmailBtn) {
  sendEmailBtn.style.display = "none";
}

let currentStep = 0;

function showStep(index) {
  steps.forEach((step, i) => {
    step.classList.toggle("active", i === index);
  });

  // Update button text if last step
  if (index === steps.length - 1) {
    if (nextBtn) {
      nextBtn.style.display = "none";

    }
    if (sendEmailBtn) {
      sendEmailBtn.style.display = "flex";
    }
  } else {
    if (nextBtn) {

      nextBtn.style.display = "flex";
    }
  }
}

function validateCurrentStep() {
  const currentStepEl = steps[currentStep];
  const requiredFields = currentStepEl.querySelectorAll("input[required], textarea[required], select[required], select, textarea");

  for (let field of requiredFields) {
    if (!field.value.trim()) {
      showToast("Please fill all details");
      field.focus();
      return false;
    }
  }

  return true;
}
if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    if (currentStep < steps.length - 1) {
      if (validateCurrentStep()) {
        currentStep++;
        showStep(currentStep);
      }
    } else {
      if (validateCurrentStep()) {
        document.getElementById("multiStepForm").submit();
      }
    }
  });
}
if (document.getElementById("prevBtn")) {
  document.getElementById("prevBtn").addEventListener("click", () => {
    if (currentStep > 0) {
      currentStep--;
      showStep(currentStep);
    }
  });
}

showStep(currentStep);


const sendMail = () => {
  const form = document.getElementById("multiStepForm");
  const thankYouMessageContainer = document.getElementById("thankYouMessage");

  // Get all input, select, and textarea values
  const inputs = form.querySelectorAll("input, select, textarea");

  const data = {};
  inputs.forEach((el, i) => {
    const placeholder = el.getAttribute("placeholder") || el.previousElementSibling?.innerText || `Field ${i+1}`;
    data[placeholder] = el.value.trim();
  });

  // Check if any field is empty
  const emptyField = Object.entries(data).find(([k, v]) => v === "");
  if (emptyField) {
    showToast(`Please fill in: ${emptyField[0]}`, "error");
    return;
  }

  // Build HTML email body
  let htmlBody = `
    <div style="font-family:'Segoe UI',Roboto,sans-serif;background:#0f0f0f;padding:30px;color:#f4f4f4;border-radius:10px;">
      <h2 style="color:tomato;margin-top:0;">🔥 New Project Request</h2>
  `;

  for (let [key, value] of Object.entries(data)) {
    htmlBody += `
      <p style="margin:8px 0;">
        <strong style="color:#ccc;">${key}:</strong> 
        <span style="color:#ddd;">${value}</span>
      </p>
    `;
  }

  htmlBody += `
      <div style="margin-top:40px;font-size:0.9em;color:#999;border-top:1px solid #333;padding-top:20px;">
        🚀 Sent from River Waves Solutions' website<br/>
        <a href="https://riverwaves.pk" style="color:tomato;text-decoration:none;">www.riverwaves.pk</a>
      </div>
    </div>
  `;

  window.Email.send({
    Host : "smtp.elasticemail.com",
    Username : "rohanmuhammad1k@gmail.com",
    Password : "E825B1402F5B0DD4AC0D7D0538FDBBAF7792",
    To : 'rohanmuhammad222k@gmail.com',
    From : "rohanmuhammad1k@gmail.com",
    Subject: "🔥 New Project Request via Website",
    Body: htmlBody,
  }).then((response) => {
    if (response === "OK") {
      thankYouMessageContainer.style.display = "block";
      form.style.display = "none";
      showToast("Project request sent successfully!", "success");
    } else {
      showToast("Failed to send email. Please try again.", "error");
      console.error(response);
    }
  });
};

const filterButtons = document.querySelectorAll(".filter-buttons button");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(button => {
  console.log("hello ")
  button.addEventListener("click", () => {
    document.querySelector(".filter-buttons button.active")?.classList.remove("active");
    button.classList.add("active");

    const filter = button.getAttribute("data-filter");

    projectCards.forEach(card => {
      const categories = card.getAttribute("data-category").split(" ");
      if (filter === "all" || categories.includes(filter)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});
