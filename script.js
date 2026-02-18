let submitted = false;

document.addEventListener('DOMContentLoaded', () => {
    // Team Size Dynamic Fields
    const teamSizeSelect = document.getElementById('teamSizeSelect');
    const memberFields = {
        1: document.getElementById('member1row'),
        2: document.getElementById('member2row')
    };
    const memberInputs = {
        1: document.getElementById('member1input'),
        2: document.getElementById('member2input')
    };

    function updateTeamFields() {
        const val = teamSizeSelect.value;
        let size = 1;
        if (val.includes('2')) size = 2;
        if (val.includes('3')) size = 3;
        
        // Reset all
        Object.values(memberFields).forEach(el => el.classList.add('hidden'));
        Object.values(memberInputs).forEach(input => input.removeAttribute('required'));

        // Show based on size (Lead is always there, member 1 is for 2+, member 2 is for 3)
        if (size >= 2) {
            memberFields[1].classList.remove('hidden');
            memberInputs[1].setAttribute('required', 'true');
        }
        if (size >= 3) {
            memberFields[2].classList.remove('hidden');
            memberInputs[2].setAttribute('required', 'true');
        }
    }

    if (teamSizeSelect) {
        teamSizeSelect.addEventListener('change', updateTeamFields);
    }

    // WhatsApp Confirmation Logic
    const waCheckbox = document.getElementById('whatsappConfirmed');
    const waEntry = document.getElementById('whatsappEntry');
    
    if (waCheckbox && waEntry) {
        waCheckbox.addEventListener('change', (e) => {
            waEntry.value = e.target.checked ? "Joined" : "Not Joined";
        });
    }

    // Form Submission Logic
    const form = document.getElementById('ideathonForm');
    
    if (form) {
        form.addEventListener('submit', () => {
            submitted = true;
            const btn = form.querySelector('button');
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Registering...';
            btn.disabled = true;

            // Fallback redirect
            setTimeout(() => {
                if (submitted) {
                    window.location.href = 'thankyou.html';
                }
            }, 5000);
        });
    }

    // Iframe Load Handler (Success)
    const iframe = document.getElementById('hidden_iframe');
    if (iframe) {
        iframe.onload = () => {
            if (submitted) {
                document.getElementById('successPopup').classList.add('show');
                setTimeout(() => {
                    window.location.href = 'thankyou.html';
                }, 1500);
            }
        };
    }

    // Scroll Logic
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in, .slide-up').forEach(el => {
        observer.observe(el);
    });
});
