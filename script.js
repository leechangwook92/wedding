/**
 * Modern Minimal Wedding Invitation - Script
 */

(function () {
  'use strict';

  // ── Helpers ──
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  function formatDate(dateStr) {
    const d = new Date(dateStr);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    const dayName = dayNames[d.getDay()];
    return { year, month, day, dayName, date: d };
  }

  function formatTime(timeStr) {
    const [h, m] = timeStr.split(':').map(Number);
    const period = h < 12 ? '오전' : '오후';
    const hour12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
    return `${period} ${hour12}시${m > 0 ? ' ' + m + '분' : ''}`;
  }


  // ============================================================
  // Gallery Images
  // 갤러리만 네이버 외부 이미지 사용
  // ============================================================

  const GALLERY_IMAGES = [
    'https://postfiles.pstatic.net/MjAyNjA5MDdfMjcz/MDAxNzg4NzY5MzE0MTYw.1MQBEfosVe_AFD_pEjaMMXHOEneqFeSBbO55E9YSuKIg.itEPFJkO2Izc79kzzvn0ttHb2tLMFuDwZSh1DzSmM-Ug.JPEG/20.jpg?type=w966',

    'https://postfiles.pstatic.net/MjAyNjA5MDdfMTQy/MDAxNzg4NzY5MzA4ODA1.xl7L2sinB6VkPkH7FhLZIs-1kixTl08Vfusi1Kaecicg.64YyIh49JIhLsRhmJiN_K9H1kVZtm_xkpMclhikBmWUg.JPEG/1.jpg?type=w966',

    'https://postfiles.pstatic.net/MjAyNjA5MDdfMjY3/MDAxNzg4NzY5MzA5MDI5.hwT7IUs85rFpswSCfTWpOa-5chXb2E9fBvjTThvynjog.G1OtQem_xsXNqrTe-N6zGa1xPXP_XUVNBRGMW8EegfMg.JPEG/2.jpg?type=w966',

    'https://postfiles.pstatic.net/MjAyNjA5MDdfNTYg/MDAxNzg4NzY5MzEyOTcw.-FoJlVwol359TxYq01_IrWpUYjFcaRGIhcQVDti8h_sg.0zRyAfb9dU4hJDsfjxHFU4Nj2hM-OFivqvs7vse3Uu0g.JPEG/3.jpg?type=w966',

    'https://postfiles.pstatic.net/MjAyNjA5MDdfMjQg/MDAxNzg4NzY5MzEyOTU4.03bxl53PID9YYjuEbJdrdAfwpHeM9jj2JqpcVnDd3rsg.owsmZSbIfyD1sFjYnJ9t4UF1IBBwCjqgYS1y_p7hXzAg.JPEG/4.jpg?type=w966',

    'https://postfiles.pstatic.net/MjAyNjA5MDdfOTQg/MDAxNzg4NzY5MzEzOTM0.NjeV_72OAVVmpS29m7LQAJ6IhIAay_Zv0DtVEV9dOukg.wph9x7y3mfM9AuRIl4agI_KhQiZ8igj4-SpcFwku44sg.JPEG/5.jpg?type=w966',

    'https://postfiles.pstatic.net/MjAyNjA5MDdfMjMz/MDAxNzg4NzY5MzEyNDgw.g_w8IBzErCZbhMiOQs3cXDSGwPVWGfFDqfwl2g9sWMIg.0_llF3buRlRjS_dM6y_4zM3kdnEvtWhHKtRRZgwuQnIg.JPEG/6.jpg?type=w3840',

    'https://postfiles.pstatic.net/MjAyNjA5MDdfNDEg/MDAxNzg4NzY5MzEyNTE2.yF8lqdhQJdJ2A-Tt9uPVAO5T3IuRt2Mm4AI4yxBrf6Ig.kCjvnnLeR1rBzxulrhXJ6ahwr-80MpUdVgs0uU06W28g.JPEG/7.jpg?type=w966',

    'https://postfiles.pstatic.net/MjAyNjA5MDdfNzkg/MDAxNzg4NzY5MzEyMjg2.9tSsVSX72IHfXjfi8-p7cVUWe79UVruT8b7m1LZazrkg.ZHVZXODOHLMX2MiTQ_qz6P_3_0jkj6sug9jXpCxmY_Mg.JPEG/8.jpg?type=w966',

    'https://postfiles.pstatic.net/MjAyNjA5MDdfMTgw/MDAxNzg4NzY5MzEyMTA5.EeWvNjYITLac8UcX9hTtdWCf2Z8GmQEcNm0KqDM2S8Ug.YJ5qbqpngRCMjupjcY7qXAyI9lhL9VeKeMXXhF2sKr4g.JPEG/9.jpg?type=w966',

    'https://postfiles.pstatic.net/MjAyNjA5MDdfMTg2/MDAxNzg4NzY5MzExMTg4.X88wbmOnR_ui6FLWyO4dhHG51P13My_KWFmRw2GWzeYg.aET2YCmm90B9nP2PiQXhaLAIsHDcXx12or_AXnbEGTwg.JPEG/10.jpg?type=w966',

    'https://postfiles.pstatic.net/MjAyNjA5MDdfMjMw/MDAxNzg4NzY5MzExMDA2.gzamA6wgKZpQqdYzi0QyFj4sRaYUq9jxNvMBM5dAPLIg.V9s9MJfBPpD-oyEBZgfMKcVC665DZaahFWWGh6HQHuwg.JPEG/11.jpg?type=w966',

    'https://postfiles.pstatic.net/MjAyNjA5MDdfMzEg/MDAxNzg4NzY5MzEwODU5.SRfj127OFhAePWYe_Hrv0KYXdL-087IZOnBCvi9hHAog.5kKe6IkbR8_s4Y5AM5O7Ehm577eVCHLWC0WMhJCloJAg.JPEG/12.jpg?type=w966',

    'https://postfiles.pstatic.net/MjAyNjA5MDdfMjkw/MDAxNzg4NzY5MzEwODcw.3nbNAkTHeGjtMyLQoFPz9yHeg2gZhM_GnGTenkFQHTIg.VyHMSsyoLz0whV6uskLEI-obzGMzOJncdOT0lw6SUocg.JPEG/13.jpg?type=w966',

    'https://postfiles.pstatic.net/MjAyNjA5MDdfODcg/MDAxNzg4NzY5MzEwNjk3.SP-kNr5R0Kcd67Uvg9Zn0qqawH6buvodEeOkGWeRFNQg.xNvQGnVH0xF4U4-Az5PlHJGwu6vFl0Sft-l21BpJBoAg.JPEG/14.jpg?type=w966',

    'https://postfiles.pstatic.net/MjAyNjA5MDdfMTMx/MDAxNzg4NzY5MzA5MDI0.Gp_h_s8viL7BkBuGtvzs_SFpq9y9TSYoAERdRFXwyb4g.NL9PBppolzOXJiaiGEooLxie9AfRwO0fBM3W9bHTtmIg.JPEG/15.jpg?type=w966',

    'https://postfiles.pstatic.net/MjAyNjA5MDdfMjQ1/MDAxNzg4NzY5MzA5MDcz.-btKcV4HpQaAmDQPYHre4S4igVFgc1iHgHp5DCGUNdog.R7_bukhuKkxMeDefw_SX_2_W3ZVbbGcseFuY1aB-RAEg.JPEG/16.jpg?type=w966',

    'https://postfiles.pstatic.net/MjAyNjA5MDdfMTE0/MDAxNzg4NzY5MzA5MDg2.3hoe9UxwVV54lShoNNb_yXSbzUiEZHEU92CDoDeCawcg.tXHEV77HzLtD6O-EWJsLWg-i3otE9QYbRa3aummVxWkg.JPEG/17.jpg?type=w966',

    'https://postfiles.pstatic.net/MjAyNjA5MDdfMjIw/MDAxNzg4NzY5MzA4OTMw.qxk2N6q65-GktfKCSsDHxw0Sglu-q5d_Cq7CCZSs5OYg.TRGvQUwz7xIxrf_R9gaIn6OSzZ5643TBqRZLzZwv-OUg.JPEG/18.jpg?type=w966',

    'https://postfiles.pstatic.net/MjAyNjA5MDdfNTcg/MDAxNzg4NzY5MzE0MDIw.Sj_xebbEaYRiO3z9ueiC-MLPRhJA3VXrwhaVRmr1_JMg.tvxHPovCEONfT78U0RD-tb-dFeuDIkcFdt46opJ8WYgg.JPEG/19.jpg?type=w966'
  ];


  // ── Image Loading ──
  // story 이미지는 기존 로컬 폴더 방식 유지
  function loadImagesFromFolder(folder, maxAttempts = 50) {
    return new Promise(resolve => {
      const images = [];
      let current = 1;
      let consecutiveFails = 0;

      function tryNext() {
        if (current > maxAttempts || consecutiveFails >= 3) {
          resolve(images);
          return;
        }

        const img = new Image();
        const path = `images/${folder}/${current}.jpg`;

        img.onload = function () {
          images.push(path);
          consecutiveFails = 0;
          current++;
          tryNext();
        };

        img.onerror = function () {
          consecutiveFails++;
          current++;
          tryNext();
        };

        img.src = path;
      }

      tryNext();
    });
  }


  // ── Toast ──
  let toastTimer = null;

  function showToast(message) {
    let toast = $('.toast');

    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      document.body.appendChild(toast);
    }

    toast.textContent = message;
    clearTimeout(toastTimer);
    toast.classList.remove('show');

    requestAnimationFrame(() => {
      toast.classList.add('show');
      toastTimer = setTimeout(() => toast.classList.remove('show'), 2000);
    });
  }


  // ── Copy to clipboard ──
  async function copyToClipboard(text, successMsg) {
    try {
      await navigator.clipboard.writeText(text);
      showToast(successMsg || '복사되었습니다');
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.cssText = 'position:fixed;left:-9999px';

      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);

      showToast(successMsg || '복사되었습니다');
    }
  }


  // ── Curtain / Intro Overlay ──
  function initCurtain(c, dateInfo, timeText) {
    const overlay = $('#curtain-overlay');
    if (!overlay) return;

    if (!c.useCurtain) {
      overlay.remove();
      return;
    }

    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    const names = $('.curtain-names', overlay);
    const date = $('.curtain-date', overlay);

    if (names) {
      names.textContent = `${c.groom.nameEn} & ${c.bride.nameEn}`;
    }

    if (date) {
      date.textContent =
          `${dateInfo.year}. ` +
          `${String(dateInfo.month).padStart(2, '0')}. ` +
          `${String(dateInfo.day).padStart(2, '0')}`;
    }

    const btn = $('#curtain-open-btn');

    if (btn) {
      btn.addEventListener('click', () => {
        overlay.classList.add('fade-out');
        document.body.style.overflow = '';

        overlay.addEventListener(
            'transitionend',
            () => {
              overlay.remove();
            },
            { once: true }
        );
      });
    }
  }


  // ── Build Page ──
  async function init() {
    if (typeof CONFIG === 'undefined') return;

    const c = CONFIG;
    const dateInfo = formatDate(c.wedding.date);
    const timeText = formatTime(c.wedding.time);

    initCurtain(c, dateInfo, timeText);

    // 기존 페이지 구성
    buildHero(c, dateInfo, timeText);
    buildInvitation(c, dateInfo, timeText);
    buildCountdown(c, dateInfo);
    buildStoryText(c);
    buildLocation(c);
    buildAccount(c);
    initScrollAnimations();
    initModal();

    showLoadingState();

    // Story는 기존 로컬 이미지 사용
    const storyImages = await loadImagesFromFolder('story');

    // ★ Gallery만 외부 URL 사용
    const galleryImages = GALLERY_IMAGES;

    buildStoryImages(storyImages);
    buildGallery(galleryImages);

    hideLoadingState();
    reobserveAnimations();
  }


  // ── Loading State ──
  function showLoadingState() {
    const storyImagesEl = $('.story-images');
    const galleryGrid = $('.gallery-grid');

    if (storyImagesEl) {
      storyImagesEl.classList.add('loading');
    }

    if (galleryGrid) {
      galleryGrid.classList.add('loading');
    }
  }

  function hideLoadingState() {
    const storyImagesEl = $('.story-images');
    const galleryGrid = $('.gallery-grid');

    if (storyImagesEl) {
      storyImagesEl.classList.remove('loading');
    }

    if (galleryGrid) {
      galleryGrid.classList.remove('loading');
    }
  }


  // ── Hero ──
  function buildHero(c, dateInfo, timeText) {
    const heroImg = $('.hero-image');

    if (heroImg) {
      heroImg.src = 'images/hero/1.jpg';
      heroImg.alt = `${c.groom.name} & ${c.bride.name}`;
    }

    const heroNames = $('.hero-names');

    if (heroNames) {
      heroNames.innerHTML =
          `<span class="ampersand">${c.groom.name} & ${c.bride.name}</span>`;
    }

    const heroDate = $('.hero-date');

    if (heroDate) {
      heroDate.textContent =
          `${dateInfo.year}. ` +
          `${String(dateInfo.month).padStart(2, '0')}. ` +
          `${String(dateInfo.day).padStart(2, '0')}. ` +
          `${dateInfo.dayName}요일 ${timeText}`;
    }

    const heroVenue = $('.hero-venue');

    if (heroVenue) {
      heroVenue.textContent = c.wedding.venue;
    }
  }


  // ── Invitation ──
  function buildInvitation(c, dateInfo, timeText) {
    const msg = $('.invitation-message');

    if (msg) {
      msg.textContent = c.invitation.message;
    }

    const parents = $('.invitation-parents');

    if (parents) {
      function parentLine(side) {
        const fatherName = side.father;
        const motherName = side.mother;

        const fatherDec = side.fatherDeceased
            ? ' class="deceased"'
            : '';

        const motherDec = side.motherDeceased
            ? ' class="deceased"'
            : '';

        return `
          <span${fatherDec}>${fatherName}</span>
          <span class="dot"></span>
          <span${motherDec}>${motherName}</span>
          <span style="color:#999;margin-left:4px">
            의 ${side === c.groom ? '아들' : '딸'}
          </span>
          <strong>${side.name}</strong>
        `;
      }

      parents.innerHTML = `
        <div class="parent-line">
          ${parentLine(c.groom)}
        </div>

        <div class="parent-line">
          ${parentLine(c.bride)}
        </div>
      `;
    }
  }


  // ── Countdown ──
  function buildCountdown(c, dateInfo) {
    const [h, m] = c.wedding.time.split(':').map(Number);

    const weddingDate = new Date(dateInfo.date);
    weddingDate.setHours(h, m, 0, 0);

    function update() {
      const now = new Date();
      const diff = weddingDate - now;

      const daysEl = $('#cd-days');
      const hoursEl = $('#cd-hours');
      const minsEl = $('#cd-mins');
      const secsEl = $('#cd-secs');
      const ddayEl = $('.countdown-dday');

      if (diff <= 0) {
        if (daysEl) daysEl.textContent = '0';
        if (hoursEl) hoursEl.textContent = '0';
        if (minsEl) minsEl.textContent = '0';
        if (secsEl) secsEl.textContent = '0';

        if (ddayEl) {
          ddayEl.textContent = '결혼식 당일입니다';
        }

        return;
      }

      const days =
          Math.floor(diff / (1000 * 60 * 60 * 24));

      const hours =
          Math.floor(
              (diff % (1000 * 60 * 60 * 24)) /
              (1000 * 60 * 60)
          );

      const mins =
          Math.floor(
              (diff % (1000 * 60 * 60)) /
              (1000 * 60)
          );

      const secs =
          Math.floor(
              (diff % (1000 * 60)) /
              1000
          );

      if (daysEl) daysEl.textContent = days;
      if (hoursEl) hoursEl.textContent = hours;
      if (minsEl) minsEl.textContent = mins;
      if (secsEl) secsEl.textContent = secs;

      if (ddayEl) {
        ddayEl.textContent = `결혼식까지 D-${days}`;
      }
    }

    update();
    setInterval(update, 1000);


    // Google Calendar
    const gcalBtn = $('#btn-gcal');

    if (gcalBtn) {
      gcalBtn.addEventListener('click', () => {
        const start = formatGoogleDate(weddingDate);

        const end = formatGoogleDate(
            new Date(
                weddingDate.getTime() +
                2 * 60 * 60 * 1000
            )
        );

        const title = encodeURIComponent(
            `${c.groom.name} ♥ ${c.bride.name} 결혼식`
        );

        const location = encodeURIComponent(
            `${c.wedding.venue} ${c.wedding.address}`
        );

        const url =
            `https://calendar.google.com/calendar/render` +
            `?action=TEMPLATE` +
            `&text=${title}` +
            `&dates=${start}/${end}` +
            `&location=${location}`;

        window.open(url, '_blank');
      });
    }


    // Apple Calendar
    const icalBtn = $('#btn-ical');

    if (icalBtn) {
      icalBtn.addEventListener('click', () => {
        const start = formatICSDate(weddingDate);

        const end = formatICSDate(
            new Date(
                weddingDate.getTime() +
                2 * 60 * 60 * 1000
            )
        );

        const ics = [
          'BEGIN:VCALENDAR',
          'VERSION:2.0',
          'PRODID:-//Wedding//Invitation//KO',
          'BEGIN:VEVENT',
          `DTSTART:${start}`,
          `DTEND:${end}`,
          `SUMMARY:${c.groom.name} ♥ ${c.bride.name} 결혼식`,
          `LOCATION:${c.wedding.venue} ${c.wedding.address}`,
          'END:VEVENT',
          'END:VCALENDAR'
        ].join('\r\n');

        const blob = new Blob(
            [ics],
            { type: 'text/calendar;charset=utf-8' }
        );

        const link = document.createElement('a');

        link.href = URL.createObjectURL(blob);
        link.download = 'wedding.ics';

        link.click();

        URL.revokeObjectURL(link.href);
      });
    }
  }


  function formatGoogleDate(d) {
    return d
        .toISOString()
        .replace(/[-:]/g, '')
        .replace(/\.\d{3}/, '');
  }

  function formatICSDate(d) {
    const pad = n =>
        String(n).padStart(2, '0');

    return (
        `${d.getFullYear()}` +
        `${pad(d.getMonth() + 1)}` +
        `${pad(d.getDate())}` +
        `T` +
        `${pad(d.getHours())}` +
        `${pad(d.getMinutes())}` +
        `00`
    );
  }


  // ── Story Text ──
  function buildStoryText(c) {
    const title = $('#story-title');

    if (title) {
      title.textContent = c.story.title;
    }

    const content = $('.story-content');

    if (content) {
      content.textContent = c.story.content;
    }
  }


  // ── Story Images ──
  function buildStoryImages(storyImages) {
    const container = $('.story-images');

    if (!container) return;

    if (storyImages.length === 0) {
      container.style.display = 'none';
      return;
    }

    container.innerHTML = storyImages
        .map(
            (src, i) => `
          <div class="story-image-item">
            <img
              src="${src}"
              alt="Our story ${i + 1}"
              loading="lazy"
            >
          </div>
        `
        )
        .join('');
  }


  // ============================================================
  // Gallery
  // ============================================================

  let galleryAllImages = [];

  function buildGallery(images) {
    const grid = $('.gallery-grid');

    if (!grid) return;

    galleryAllImages = images;

    if (images.length === 0) {
      const gallerySection =
          grid.closest('.gallery');

      if (gallerySection) {
        gallerySection.style.display = 'none';
      }

      return;
    }

    // 처음에는 6장
    const initialCount = 6;

    function renderImages(count) {
      grid.innerHTML = images
          .slice(0, count)
          .map(
              (src, i) => `
            <div
              class="gallery-item"
              data-index="${i}"
            >
              <img
                src="${src}"
                alt="Gallery photo ${i + 1}"
                loading="lazy"
                referrerpolicy="no-referrer"
              >
            </div>
          `
          )
          .join('');

      $$('.gallery-item', grid)
          .forEach(item => {
            item.addEventListener(
                'click',
                () => {
                  openModal(
                      images,
                      parseInt(
                          item.dataset.index,
                          10
                      )
                  );
                }
            );
          });
    }

    renderImages(
        Math.min(
            initialCount,
            images.length
        )
    );


    // 더보기
    const moreBtn =
        $('.btn-gallery-more');

    if (moreBtn) {
      if (images.length <= initialCount) {
        moreBtn.parentElement.style.display =
            'none';
      } else {
        let expanded = false;

        moreBtn.addEventListener(
            'click',
            () => {
              if (!expanded) {
                renderImages(images.length);

                moreBtn.textContent =
                    '접기';

                expanded = true;
              } else {
                renderImages(initialCount);

                moreBtn.textContent =
                    '더보기';

                expanded = false;

                grid.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
                });
              }
            }
        );
      }
    }
  }


  // ── Photo Modal ──
  let currentModalImages = [];
  let currentModalIndex = 0;

  let touchStartX = 0;
  let touchEndX = 0;

  function initModal() {
    const overlay =
        $('.modal-overlay');

    if (!overlay) return;

    const closeBtn =
        $('.modal-close');

    const prevBtn =
        $('.modal-prev');

    const nextBtn =
        $('.modal-next');

    const swipeArea =
        $('.modal-swipe-area');

    closeBtn?.addEventListener(
        'click',
        closeModal
    );

    prevBtn?.addEventListener(
        'click',
        () => navigateModal(-1)
    );

    nextBtn?.addEventListener(
        'click',
        () => navigateModal(1)
    );

    overlay.addEventListener(
        'click',
        e => {
          if (
              e.target === overlay ||
              e.target === swipeArea
          ) {
            closeModal();
          }
        }
    );


    // 모바일 스와이프
    swipeArea?.addEventListener(
        'touchstart',
        e => {
          touchStartX =
              e.changedTouches[0].screenX;
        },
        { passive: true }
    );

    swipeArea?.addEventListener(
        'touchend',
        e => {
          touchEndX =
              e.changedTouches[0].screenX;

          const diff =
              touchStartX - touchEndX;

          if (Math.abs(diff) > 50) {
            navigateModal(
                diff > 0 ? 1 : -1
            );
          }
        },
        { passive: true }
    );


    // 키보드
    document.addEventListener(
        'keydown',
        e => {
          if (
              !overlay.classList.contains(
                  'active'
              )
          ) {
            return;
          }

          if (e.key === 'Escape') {
            closeModal();
          }

          if (e.key === 'ArrowLeft') {
            navigateModal(-1);
          }

          if (e.key === 'ArrowRight') {
            navigateModal(1);
          }
        }
    );
  }


  function openModal(images, index) {
    currentModalImages = images;
    currentModalIndex = index;

    const overlay =
        $('.modal-overlay');

    if (!overlay) return;

    updateModalImage();

    overlay.classList.add('active');

    document.body.style.overflow =
        'hidden';
  }


  function closeModal() {
    const overlay =
        $('.modal-overlay');

    if (!overlay) return;

    overlay.classList.remove('active');

    document.body.style.overflow = '';
  }


  function navigateModal(dir) {
    currentModalIndex += dir;

    if (currentModalIndex < 0) {
      currentModalIndex =
          currentModalImages.length - 1;
    }

    if (
        currentModalIndex >=
        currentModalImages.length
    ) {
      currentModalIndex = 0;
    }

    updateModalImage();
  }


  function updateModalImage() {
    const img =
        $('.modal-image');

    const counter =
        $('.modal-counter');

    if (img) {
      img.src =
          currentModalImages[
              currentModalIndex
              ];

      img.alt =
          `Photo ${currentModalIndex + 1}`;

      // 네이버 외부 이미지
      img.referrerPolicy = 'no-referrer';
    }

    if (counter) {
      counter.textContent =
          `${currentModalIndex + 1} / ` +
          `${currentModalImages.length}`;
    }
  }


  // ── Location ──
  function buildLocation(c) {
    const venueName =
        $('.location-venue-name');

    const venueHall =
        $('.location-venue-hall');

    const address =
        $('.location-address');

    const tel =
        $('.location-tel');

    const mapImg =
        $('.location-map-image img');

    if (venueName) {
      venueName.textContent =
          c.wedding.venue;
    }

    if (venueHall) {
      venueHall.textContent =
          c.wedding.hall;
    }

    if (address) {
      address.textContent =
          c.wedding.address;
    }

    if (tel && c.wedding.tel) {
      tel.innerHTML =
          `<a href="tel:${c.wedding.tel}">` +
          `${c.wedding.tel}` +
          `</a>`;
    }

    if (mapImg) {
      mapImg.src =
          'images/location/1.jpg';

      mapImg.alt =
          `${c.wedding.venue} 약도`;
    }


    // 주소 복사
    const copyBtn =
        $('#btn-copy-address');

    copyBtn?.addEventListener(
        'click',
        () => {
          copyToClipboard(
              c.wedding.address,
              '주소가 복사되었습니다'
          );
        }
    );


    // 지도 링크
    const kakaoLink =
        $('#link-kakao-map');

    const naverLink =
        $('#link-naver-map');

    if (
        kakaoLink &&
        c.wedding.mapLinks.kakao
    ) {
      kakaoLink.href =
          c.wedding.mapLinks.kakao;
    }

    if (
        naverLink &&
        c.wedding.mapLinks.naver
    ) {
      naverLink.href =
          c.wedding.mapLinks.naver;
    }
  }


  // ── Account ──
  function buildAccount(c) {
    buildAccountGroup(
        'groom',
        c.accounts.groom,
        '신랑측 계좌번호'
    );

    buildAccountGroup(
        'bride',
        c.accounts.bride,
        '신부측 계좌번호'
    );
  }


  function buildAccountGroup(
      side,
      accounts,
      label
  ) {
    const group =
        $(`#account-${side}`);

    if (!group) return;

    const toggle =
        $('.account-group-toggle', group);

    const list =
        $('.account-list', group);

    if (toggle) {
      const labelEl =
          toggle.querySelector(
              '.toggle-label'
          );

      if (labelEl) {
        labelEl.textContent = label;
      }

      toggle.addEventListener(
          'click',
          () => {
            group.classList.toggle('open');
          }
      );
    }

    if (list) {
      list.innerHTML = accounts
          .map(
              acc => `
            <div class="account-item">

              <div class="account-info">

                <div class="account-role">
                  ${acc.role}
                </div>

                <div class="account-detail">

                  <span class="account-name">
                    ${acc.name}
                  </span>

                  ${acc.bank}
                  ${acc.number}

                </div>

              </div>

              <button
                class="btn-copy-account"
                data-copy="${acc.bank} ${acc.number} ${acc.name}"
              >
                복사
              </button>

            </div>
          `
          )
          .join('');

      $$('.btn-copy-account', list)
          .forEach(btn => {
            btn.addEventListener(
                'click',
                () => {
                  copyToClipboard(
                      btn.dataset.copy,
                      '계좌번호가 복사되었습니다'
                  );
                }
            );
          });
    }
  }


  // ── Scroll Animations ──
  let scrollObserver = null;

  function initScrollAnimations() {
    scrollObserver =
        new IntersectionObserver(
            entries => {
              entries.forEach(
                  entry => {
                    if (
                        entry.isIntersecting
                    ) {
                      entry.target.classList.add(
                          'visible'
                      );

                      scrollObserver.unobserve(
                          entry.target
                      );
                    }
                  }
              );
            },
            {
              threshold: 0.1,
              rootMargin:
                  '0px 0px -40px 0px'
            }
        );

    $$('.fade-in').forEach(
        el =>
            scrollObserver.observe(el)
    );
  }


  function reobserveAnimations() {
    if (!scrollObserver) return;

    $$('.fade-in:not(.visible)')
        .forEach(
            el =>
                scrollObserver.observe(el)
        );
  }


  // ── Init ──
  if (
      document.readyState === 'loading'
  ) {
    document.addEventListener(
        'DOMContentLoaded',
        init
    );
  } else {
    init();
  }

})();