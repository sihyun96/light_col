// 기존 createFloatingBubble 관련 코드는 모두 삭제하셔도 됩니다.
document.addEventListener('DOMContentLoaded', () => {
    console.log("Floating bubbles initialized via CSS.");
});


// --- Chart Animation Logic ---

document.addEventListener('DOMContentLoaded', () => {

    function animatePieCount(element, targetPercentage, duration = 1500) {
        const valueSpan = element.querySelector('.percentage-value');
        const startTime = performance.now();

        const fill_color = '#2563EB';
        const empty_color = 'rgba(122, 122, 122, 1)';

        function updatePieCount(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const currentValue = Math.floor(targetPercentage * progress);

            element.style.background = `
                conic-gradient(
                    ${fill_color} ${currentValue}%,
                    ${empty_color} 0
                )
            `;
            valueSpan.textContent = `${currentValue}%`;

            if (progress < 1) {
                requestAnimationFrame(updatePieCount);
            }
        }

        requestAnimationFrame(updatePieCount);
    }

    const pieCharts = document.querySelectorAll('.pie-chart-placeholder');
    if (!pieCharts.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const chart = entry.target;
            if (chart.classList.contains('animated')) return;

            const target = Number(chart.dataset.target);
            if (isNaN(target)) return;

            animatePieCount(chart, target);
            chart.classList.add('animated');
            obs.unobserve(chart);
        });
    }, {
        // 🔥 화면 중앙을 기준으로 트리거
        rootMargin: '-45% 0px -35% 0px',
        threshold: 0.15
    });

    pieCharts.forEach(chart => observer.observe(chart));
});


const pieCharts = document.querySelectorAll('.pie-chart-placeholder');

const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const chart = entry.target;

        // 이미 실행됐으면 스킵
        if (chart.classList.contains('animated')) return;

        const target = Number(chart.dataset.target);

        animatePieCount(chart, target);

        chart.classList.add('animated');
        obs.unobserve(chart); // 재실행 방지
    });
}, {
    threshold: 0.6 // 차트가 60% 이상 보이면 시작
});

// 관찰 시작
pieCharts.forEach(chart => observer.observe(chart));





// ... (다른 모든 코드는 이전 단계와 동일하게 유지) ...

// 2. 차트 애니메이션 실행 함수
function runChartAnimations(target) {
    // a. Circle Chart (837만명 원형이 이동하며 커지기)
    const lgCircle = target.querySelector('.circle.lg');
    lgCircle.classList.add('animate-move'); // CSS transform: translateX(0) scale(1) 실행
    
    // b. Pie Chart 실행 (숫자 카운트와 파이 채우기 동시 실행)
    const pieChart = target.querySelector('.pie-chart-placeholder');
    const pieTarget = parseInt(pieChart.dataset.target);
    animatePieCount(pieChart, pieTarget);
}


// Intersection Observer 설정 (스크롤 시 애니메이션 실행)
document.addEventListener('DOMContentLoaded', () => {
    const marketSection = document.querySelector('.market-section');
    if (!marketSection) return;

    let executed = false;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !executed) {
                const chartContainer = marketSection.querySelector('.chart-container');
                runChartAnimations(chartContainer);
                executed = true;
                observer.unobserve(marketSection);
            }
        });
    }, { threshold: 0.3 });

    observer.observe(marketSection);
});


const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // 한 번만 실행
    });
}, {
    threshold: 0.3
});

revealElements.forEach(el => revealObserver.observe(el));


document.addEventListener('DOMContentLoaded', () => {

  /* =========================
     TEXT REVEAL
  ========================= */
  const revealElements = document.querySelectorAll(
    '.problems-section h2, .problems-section .en-sub-text, .card.black-card h4, .card.black-card li'
  );

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
        observer.unobserve(entry.target); // 1회만 실행
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));


  /* =========================
     CARD STICKY OFFSET
  ========================= */

});


document.addEventListener('DOMContentLoaded', () => {
    const ecosystemSection = document.querySelector('.ecosystem-section');
    
    // Intersection Observer 설정
    const observerOptions = {
        // rootMargin의 세 번째 값(-30%)은 화면 바닥에서 30% 올라온 지점(즉, 중간 근처)에 
        // 도달했을 때 이벤트를 발생시키라는 뜻입니다.
        rootMargin: '0px 0px -30% 0px', 
        threshold: 0.1 
    };

    const ecosystemObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 섹션에 active 클래스 추가
                entry.target.classList.add('active');
                // 한 번 실행 후 감시 종료
                ecosystemObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    if (ecosystemSection) {
        ecosystemObserver.observe(ecosystemSection);
    }
});


document.addEventListener('DOMContentLoaded', () => {
    // Main Bottom 섹션 선택
    const mainBottomSection = document.querySelector('.main-bottom');

    const observerOptions = {
        // 섹션이 화면의 20% 지점까지 올라왔을 때 감지
        rootMargin: '0px 0px -20% 0px',
        threshold: 0
    };

    const mainBottomObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // active 클래스 추가로 도트 패턴 및 텍스트 애니메이션 시작
                entry.target.classList.add('active');
                mainBottomObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    if (mainBottomSection) {
        mainBottomObserver.observe(mainBottomSection);
    }
});


document.addEventListener('DOMContentLoaded', () => {
    // 1. 클릭 아코디언 기능
    const triggers = document.querySelectorAll('.gray-box');
    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const parent = trigger.closest('.flow-item-group');
            parent.classList.toggle('active');
        });
    });

    // 2. 스크롤 시 섹션 활성화 (Intersection Observer)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.2 });

    const section = document.querySelector('.solutions-section');
    if (section) observer.observe(section);
});


document.addEventListener('DOMContentLoaded', () => {
            const cards = document.querySelectorAll('.card.black-card');

            const handleScroll = () => {
                const triggerPoint = window.innerHeight * 0.4; // 40% of viewport height
                
                cards.forEach((card, index) => {
                    const rect = card.getBoundingClientRect();
                    
                    // Reset classes first
                    card.classList.remove('is-active', 'is-covered');
                    
                    // Logic: 
                    // If card is sticky (reached its top position), it's potentially active.
                    // But we want to know which one is currently the "Main" one being viewed.
                    // Usually the last one that crossed the trigger point is the active one.
                    
                    // Let's rely on the visual stack logic.
                    // If a card is sticking at the top, and another card is BELOW it but also sticking, the one below covers the one above.
                    
                    // Simple logic:
                    // Loop through and see which cards have reached the sticky zone.
                    
                    // Check if the NEXT card has reached the sticky overlap zone.
                    // If the next card is overlapping this card, this card becomes 'is-covered'.
                    
                    const nextCard = cards[index + 1];
                    let isNextCardOverlapping = false;
                    
                    if (nextCard) {
                        const nextRect = nextCard.getBoundingClientRect();
                        // If next card is close to the top (sticky position), it is covering the current card
                        if (nextRect.top < window.innerHeight * 0.5) {
                            isNextCardOverlapping = true;
                        }
                    }

                    // Apply classes based on scroll position
                    // We define "Active" as the card currently fully visible on top of the stack
                    
                    if (isNextCardOverlapping) {
                        card.classList.add('is-covered');
                    } else if (rect.top <= window.innerHeight * 0.8) {
                        card.classList.add('is-active');
                    }
                    
                    // Text Reveal Logic (Optional: trigger when card enters view)
                    if (rect.top <= window.innerHeight * 0.75) {
                        const texts = card.querySelectorAll('h4, li');
                        texts.forEach(el => el.classList.add('reveal-active'));
                    }
                });
            };

            window.addEventListener('scroll', handleScroll);
            handleScroll(); // Initial check
        });





$(document).ready(function() {
    // 1. 스크롤 애니메이션 Observer 설정
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                $(entry.target).addClass('active');
                // 한 번 나타나면 감시 해제 (성능 최적화)
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.1, // 10% 정도 보이면 시작
        rootMargin: "0px 0px -50px 0px" // 하단 여백을 주어 약간 미리 시작
    });

    // 모든 reveal 요소 감시 시작
    $('.reveal').each(function() {
        revealObserver.observe(this);
    });

    // 2. (기존 로직 유지) 카드 뒤집기 등 추가 기능이 있다면 아래에 계속 작성...
    $('.book-card').on('click', function() {
        $(this).toggleClass('is-flipped');
    });
});

// 벤다이어그램
document.addEventListener('DOMContentLoaded', () => {
    const ecosystemSection = document.querySelector('.ecosystem-section');
    
    const observerOptions = {
        rootMargin: '0px 0px -30% 0px',
        threshold: 0.1 
    };

    const ecosystemObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                ecosystemObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    if (ecosystemSection) {
        ecosystemObserver.observe(ecosystemSection);
    }
});


// 타이핑효과
document.addEventListener('DOMContentLoaded', () => {
  const trigger = document.querySelector('.typing-trigger');
  const typingEl = document.querySelector('.typing-text');
  if (!trigger || !typingEl) return;

  const text = typingEl.dataset.text;
  let index = 0;
  let started = false;

  function startTyping() {
    if (started) return;
    started = true;

    function type() {
      if (index < text.length) {
        typingEl.textContent += text[index];
        index++;
        setTimeout(type, 70);
      } else {
        typingEl.classList.add('is-complete');
        lightUpWord(); // ✅ 타이핑 끝나면 실행
      }
    }

    type();
  }

  // ✅ '밝게'만 불 켜기
  function lightUpWord() {
    const targetWord = '밝게';

    const html = typingEl.textContent.replace(
      targetWord,
      `<span class="light-word">${targetWord}</span>`
    );

    typingEl.innerHTML = html;

    // 살짝 딜레이 후 점등
    setTimeout(() => {
      const wordEl = typingEl.querySelector('.light-word');
      wordEl?.classList.add('is-lit');
    }, 300);
  }

  const observer = new IntersectionObserver(
    ([entry], obs) => {
      if (entry.isIntersecting) {
        startTyping();
        obs.disconnect();
      }
    },
    {
      threshold: 0,
      rootMargin: '0px 0px -20% 0px'
    }
  );

  observer.observe(trigger);
});
