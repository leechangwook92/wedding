/**
 * Modern Minimal Wedding Invitation Configuration
 *
 * Edit the values below to customize your wedding invitation.
 * Image files should be placed in the corresponding images/ subfolders
 * using sequential filenames (1.jpg, 2.jpg, ...).
 * The code auto-detects images by trying sequential filenames.
 *
 * Image folder conventions:
 *   images/hero/1.jpg       - Main wedding photo (single file)
 *   images/story/1.jpg, ... - Story section photos (auto-detected)
 *   images/gallery/1.jpg, . - Gallery photos (auto-detected)
 *   images/location/1.jpg   - Venue/map image (single file)
 *   images/og/1.jpg         - Kakao share thumbnail (single file)
 */

const CONFIG = {
  // ── 초대장 열기 ──
  useCurtain: false,  // 초대장 열기 화면 사용 여부 (true: 사용, false: 바로 본문 표시)

  // ── 메인 (히어로) ──
  groom: {
    name: "알렉스 스피츠내걸",
    nameEn: "Alexander Spitznage",
    father: "프레드",
    mother: "캐롤",
    fatherDeceased: true,
    motherDeceased: false
  },

  bride: {
    name: "이창해",
    nameEn: "Lee changhai",
    father: "이종율",
    mother: "임호선",
    fatherDeceased: false,
    motherDeceased: false
  },

  wedding: {
    date: "2026-11-07",
    time: "12:00",
    venue: "월미도 양진당",
    hall: "월미공원(한국전통정원)",
    address: "인천 제물포구 월미로 131-22 ",
    tel: "032-765-4133",
    mapLinks: {
      kakao: "https://kko.to/lHTRLngUq9",
      naver: "https://naver.me/FP8oarA3"
    }
  },

  // ── 인사말 ──
  invitation: {
    title: "소중한 분들을 초대합니다",
    message: "서로 다른 길을 걸어온 두 사람이\n이제 같은 길을 함께 걸어가려 합니다.\n\n바쁘시더라도 오셔서\n축복해 주시면 감사하겠습니다."
  },

  // ── 우리의 이야기 ──
  story: {
    title: "우리의 이야기",
    content: "서로 다른 길을 걷던 두 사람이\n하나의 길을 함께 걷게 되었습니다.\n\n여러분을 소중한 자리에 초대합니다."
  },

  // ── 오시는 길 ──
  // (mapLinks는 wedding 객체 내에 포함)

  // ── 마음 전하실 곳 ──
  accounts: {
    groom: [
      { role: "신랑", name: "알렉스", bank: "국민은행", number: "001501-04-112976" },
      { role: "아버지", name: "프레드", bank: "국민은행", number: "001501-04-112976" },
      { role: "어머니", name: "케롤", bank: "국민은행", number: "001501-04-112976" }
    ],
    bride: [
      { role: "신부", name: "이창해", bank: "국민은행", number: "001501-04-112976" },
      { role: "아버지", name: "이종율", bank: "기업은행", number: "023-18-83382-9" },
      { role: "어머니", name: "임호선", bank: "농협은행", number: "419-12-211301" }
    ]
  },

  // ── 링크 공유 시 나타나는 문구 ──
  kakaoShare: {
    jsKey: "",
    title: "알렉스 ♥ 이창해 결혼합니다",
    description: "알렉스 ♥ 이창해 결혼합니다"
  }
};
