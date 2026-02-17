let submitted = false;

document.addEventListener('DOMContentLoaded', () => {
    // Team Size Dynamic Fields
    const teamSizeSelect = document.getElementById('teamSizeSelect');
    const memberFields = {
        1: document.getElementById('member1row'),
        2: document.getElementById('member2row'),
        3: document.getElementById('member3row')
    };
    const memberInputs = {
        1: document.getElementById('member1input'),
        2: document.getElementById('member2input'),
        3: document.getElementById('member3input')
    };

    function updateTeamFields() {
        const size = parseInt(teamSizeSelect.value) || 0;
        
        Object.values(memberFields).forEach(el => el.classList.add('hidden'));
        Object.values(memberInputs).forEach(input => input.removeAttribute('required'));

        if (size >= 2) {
            memberFields[1].classList.remove('hidden');
            memberInputs[1].setAttribute('required', 'true');
        }
        if (size >= 3) {
            memberFields[2].classList.remove('hidden');
            memberInputs[2].setAttribute('required', 'true');
        }
        if (size >= 4) {
            memberFields[3].classList.remove('hidden');
            memberInputs[3].setAttribute('required', 'true');
        }
    }

    teamSizeSelect.addEventListener('change', updateTeamFields);

    // Form Submission Logic
    const form = document.getElementById('ideathonForm');
    
    // Additional Validation for Transaction ID
    // Although 'pattern' attribute handles it, we can add a visual check or ensure it's robust
    const txnInput = form.querySelector('input[name="entry.1579328407"]');
    txnInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '').slice(0, 12); // Only digits, max 12
    });

    // WhatsApp Confirmation Logic
    const waCheckbox = document.getElementById('whatsappConfirmed');
    const waEntry = document.getElementById('whatsappEntry');
    
    waCheckbox.addEventListener('change', (e) => {
        waEntry.value = e.target.checked ? "Joined" : "Not Joined";
    });

    form.addEventListener('submit', () => {
        submitted = true;
        const btn = form.querySelector('button');
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';
        btn.disabled = true;

        // Fallback: If iframe onload doesn't fire in 5 seconds, redirect anyway
        setTimeout(() => {
            if (submitted) {
                window.location.href = 'thankyou.html';
            }
        }, 5000);
    });

    // Iframe Load Handler (Success)
    const iframe = document.getElementById('hidden_iframe');
    iframe.onload = () => {
        if (submitted) {
            document.getElementById('successPopup').classList.add('show');
            setTimeout(() => {
                window.location.href = 'thankyou.html';
            }, 1500);
        }
    };

    // Scroll Logic
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
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
