export interface Quote {
  id: string;
  dialect: string;
  standard: string;
  meaning: string;
  accentTip: string;
  category: 'sloth' | 'work' | 'study' | 'diet' | 'comfort';
  categoryLabel: string;
  spiceLevel: 1 | 2 | 3; // 1: 순한맛, 2: 보통맛, 3: 매운맛
  tag: string;
}

export const QUOTE_CATEGORIES = [
  { id: 'all', label: '전체 보기', icon: 'Sparkles' },
  { id: 'sloth', label: '나태 극복', icon: 'Flame' },
  { id: 'work', label: '일·사업·돈', icon: 'Briefcase' },
  { id: 'study', label: '공부·취준', icon: 'GraduationCap' },
  { id: 'diet', label: '운동·다이어트', icon: 'Dumbbell' },
  { id: 'comfort', label: '츤데레 위로', icon: 'Heart' },
] as const;

export const SPICE_LEVELS = [
  { level: 0, label: '전체 매운맛', icon: '✨' },
  { level: 1, label: '순한맛 (츤데레 격려)', icon: '🌱' },
  { level: 2, label: '보통맛 (찰진 팩폭)', icon: '🌶️' },
  { level: 3, label: '매운맛 (극딜 정신번쩍)', icon: '🔥' },
] as const;

export const QUOTES: Quote[] = [
  // 1. 나태 극복 (Sloth)
  {
    id: 'sloth-1',
    dialect: '니 지금 누버가 폰만 쳐다보고 있을 때가?! 퍼뜩 인나라!',
    standard: '너 지금 누워서 스마트폰만 보고 있을 때야?! 어서 일어나!',
    meaning: '천장 본다고 인생 답 안 나온다. 폰 던지고 발바닥부터 땅에 붙이라.',
    accentTip: "'퍼뜩'에 악센트를 강하게 꽂고 '인나라'의 '라'를 길게 올려야 제맛입니다.",
    category: 'sloth',
    categoryLabel: '나태 극복',
    spiceLevel: 3,
    tag: '#침대탈출'
  },
  {
    id: 'sloth-2',
    dialect: '내일부터 한다꼬? 내일 되믄 또 낼모레라칼 놈 아이가?!',
    standard: '내일부터 한다고? 내일 되면 또 모레라고 미룰 놈 아니니?!',
    meaning: '니 다이어리 1월 1일 계획 빼고 다 백지인 거 알고 있다. 지금 당장 해라.',
    accentTip: "'내일부터'의 '부터'를 퉁명스럽게 뱉고, '아이가' 끝을 혀끝으로 쳐올리세요.",
    category: 'sloth',
    categoryLabel: '나태 극복',
    spiceLevel: 2,
    tag: '#미루기금지'
  },
  {
    id: 'sloth-3',
    dialect: '숨만 쉬고 가만 있으믄 가마니 된다! 꼼지락거리지 말고 움직이라!',
    standard: '숨만 쉬고 가만히 있으면 가마니 된다! 빈둥거리지 말고 움직여!',
    meaning: '생각만 많고 손가락 하나 까딱 안 하면 달라지는 건 나이밖에 없다.',
    accentTip: "'가마니'와 '움직이라'의 리듬감을 살려 잰걸음 하듯 빠르게 말하세요.",
    category: 'sloth',
    categoryLabel: '나태 극복',
    spiceLevel: 2,
    tag: '#행동력'
  },
  {
    id: 'sloth-4',
    dialect: '와 자꾸 핑계를 대노? 하기 싫으믄 시원하게 때려치뿌든가!',
    standard: '왜 자꾸 핑계를 대니? 하기 싫으면 시원하게 그만두든가!',
    meaning: '포기할 용기도 없으면서 핑계만 대는 건 스스로를 괴롭히는 거다.',
    accentTip: "'와 자꾸'의 '와'를 가슴 깊은 곳에서 끌어올리는 탄식조로 발음합니다.",
    category: 'sloth',
    categoryLabel: '나태 극복',
    spiceLevel: 3,
    tag: '#핑계차단'
  },
  {
    id: 'sloth-5',
    dialect: '천지삐까리로 널린 게 시간인 줄 아나? 세월 금방 간데이!',
    standard: '널리고 널린 게 시간인 줄 알아? 세월 금방 지나간다!',
    meaning: '젊음도 기회도 눈 깜짝할 사이에 지나간다. 있을 때 아껴 쓰고 부지런히 살아라.',
    accentTip: "'천지삐까리'는 한 호흡으로 몰아치듯 경쾌하게 끊어 쳐야 합니다.",
    category: 'sloth',
    categoryLabel: '나태 극복',
    spiceLevel: 2,
    tag: '#시간관리'
  },
  {
    id: 'sloth-6',
    dialect: '눈깔에 힘 딱 주고 똑디 해라. 졸리면 세수라도 하고 오든가!',
    standard: '눈에 힘 딱 주고 똑바로 해. 졸리면 세수라도 하고 오든지!',
    meaning: '흐리멍텅한 눈빛으로는 복도 도망간다. 눈에 총기부터 챙겨라.',
    accentTip: "'똑디'의 쌍디귿 발음을 야무지게 씹어 삼키듯 말하세요.",
    category: 'sloth',
    categoryLabel: '나태 극복',
    spiceLevel: 3,
    tag: '#정신무장'
  },
  {
    id: 'sloth-7',
    dialect: '우물쭈물하다가 장 다 파한다! 생각 그만하고 몸부터 써라!',
    standard: '우물쭈물하다가 장 다 파한다! 생각 그만하고 몸부터 움직여라!',
    meaning: '고민만 백 날 해봤자 시작 안 하면 0점이다. 1점이라도 만들고 고민해라.',
    accentTip: "'장 다 파한다'를 단호하게 끊어치며 위기감을 조성하세요.",
    category: 'sloth',
    categoryLabel: '나태 극복',
    spiceLevel: 1,
    tag: '#일단시작'
  },
  {
    id: 'sloth-8',
    dialect: '니 인생 대신 살아줄 사람 일절 없다! 억울하믄 니가 해내라!',
    standard: '네 인생 대신 살아줄 사람 전혀 없어! 억울하면 네가 해내!',
    meaning: '남 탓, 환경 탓 그만하고 내 인생의 운전대를 내가 꽉 잡아라.',
    accentTip: "'일절 없다'를 힘있게 내리꽂으며 무게감을 주어야 합니다.",
    category: 'sloth',
    categoryLabel: '나태 극복',
    spiceLevel: 3,
    tag: '#자립심'
  },

  // 2. 일·사업·돈 (Work)
  {
    id: 'work-1',
    dialect: '와 그라노? 쫄았나? 함 부딪치보고 안 되믄 그때 질질 짜라!',
    standard: '왜 그래? 겁먹었어? 한번 부딪혀보고 안 되면 그때 울어!',
    meaning: '해보지도 않고 지레 겁먹지 마라. 깨지더라도 멋있게 부딪혀봐야 배운다.',
    accentTip: "'쫄았나'에 얄미운 톤을 살짝 얹고, '부딪치보고'에서 결기를 드러내세요.",
    category: 'work',
    categoryLabel: '일·사업·돈',
    spiceLevel: 2,
    tag: '#도전정신'
  },
  {
    id: 'work-2',
    dialect: '돈 벌기가 쉬운 줄 아나? 땀방울 안 흘리고 들어오는 복은 없데이!',
    standard: '돈 벌기가 쉬운 줄 알아? 땀 흘리지 않고 얻는 복은 없어!',
    meaning: '노력 없는 대박은 사기다. 한 계단씩 단단하게 밟고 올라가야 안 무너진다.',
    accentTip: "'돈 벌기가'를 묵직하게 누르고, '없데이'에서 신신당부하는 어조를 살립니다.",
    category: 'work',
    categoryLabel: '일·사업·돈',
    spiceLevel: 2,
    tag: '#근면성실'
  },
  {
    id: 'work-3',
    dialect: '남 눈치 보지 말고 니 갈 길만 똑바로 가라. 욕하는 놈들이 밥 먹여주나?',
    standard: '남 눈치 보지 말고 네 갈 길만 똑바로 가. 비난하는 사람들이 밥 먹여줘?',
    meaning: '구경꾼들 수군거림에 흔들리지 마라. 결과로 입을 다물게 해주면 된다.',
    accentTip: "'밥 먹여주나'에서 콧소리를 약간 섞어 쏘아붙이듯 말해야 합니다.",
    category: 'work',
    categoryLabel: '일·사업·돈',
    spiceLevel: 2,
    tag: '#마이웨이'
  },
  {
    id: 'work-4',
    dialect: '일 머리 없는 건 죄가 아니다만, 잔머리 굴리는 건 천벌 받는데이!',
    standard: '일머리 부족한 건 죄가 아니지만, 얕은수 쓰는 건 큰일 난다!',
    meaning: '요령 피우지 말고 정공법으로 가라. 정직한 뚝심이 결국 제일 빠르다.',
    accentTip: "'천벌 받는데이'에서 경고의 엄숙함을 진지하게 실어주세요.",
    category: 'work',
    categoryLabel: '일·사업·돈',
    spiceLevel: 3,
    tag: '#정직과신뢰'
  },
  {
    id: 'work-5',
    dialect: '남들이 안 된다 칼 때가 진짜 기회인기라. 꽉 물고 버티뿌라!',
    standard: '남들이 안 된다고 할 때가 진짜 기회야. 꽉 물고 버텨내라!',
    meaning: '다들 포기하고 떠날 때 끝까지 버티는 놈이 시장을 독식한다.',
    accentTip: "'기회인기라'에서 확신에 찬 목소리로 힘을 주어 뱉으세요.",
    category: 'work',
    categoryLabel: '일·사업·돈',
    spiceLevel: 1,
    tag: '#존버정신'
  },
  {
    id: 'work-6',
    dialect: '월급날 통장 보고 한숨 쉴 시간에, 니 몸값 올릴 궁리나 해라!',
    standard: '월급날 통장 잔고 보고 한숨 쉴 시간에, 네 몸값 높일 연구나 해!',
    meaning: '불평할 시간 쪼개서 실력을 쌓아라. 실력이 오르면 돈은 알아서 따라온다.',
    accentTip: "'한숨 쉴 시간에'를 톡 쏘아붙이고 '궁리나 해라'를 단호하게 마무리합니다.",
    category: 'work',
    categoryLabel: '일·사업·돈',
    spiceLevel: 3,
    tag: '#자기계발'
  },
  {
    id: 'work-7',
    dialect: '준비만 3년째 하모 늙어 죽는다! 지금 바로 개시해뿌라!',
    standard: '준비만 3년째 하면 늙어 죽는다! 지금 바로 출시해버려!',
    meaning: '완벽한 타이밍은 영원히 안 온다. 미완성이라도 세상에 내놓고 고쳐가라.',
    accentTip: "'개시해뿌라'를 경쾌하고 박력 있게 내지르세요.",
    category: 'work',
    categoryLabel: '일·사업·돈',
    spiceLevel: 2,
    tag: '#실행력갑'
  },

  // 3. 공부·취준 (Study)
  {
    id: 'study-1',
    dialect: '책 펴놓고 멍때리지 마라! 그럴 바엔 불 끄고 잠이나 자든가!',
    standard: '책 펼쳐놓고 멍때리지 마! 그럴 거면 불 끄고 잠이나 자든지!',
    meaning: '의자에 엉덩이만 붙이고 앉아있다고 공부하는 게 아니다. 밀도 있게 집중해라.',
    accentTip: "'멍때리지 마라'를 콕 짚어주고 뒤는 시원하게 질러주세요.",
    category: 'study',
    categoryLabel: '공부·취준',
    spiceLevel: 3,
    tag: '#초집중'
  },
  {
    id: 'study-2',
    dialect: '남들 잘 때 다 자고, 놀 때 다 놀면서 성공하길 바라나? 도둑놈 심보제!',
    standard: '남들 잘 때 다 자고, 놀 때 다 놀면서 성공을 바라니? 도둑놈 심보지!',
    meaning: '남들과 똑같이 살면서 남들보다 특별한 결과를 바라는 건 욕심이다.',
    accentTip: "'도둑놈 심보제'를 혀를 차며 찰지게 발음하는 것이 핵심입니다.",
    category: 'study',
    categoryLabel: '공부·취준',
    spiceLevel: 3,
    tag: '#자기절제'
  },
  {
    id: 'study-3',
    dialect: '이 문제 하나 못 이겨서 우얄래? 니 가오가 있지, 끝까지 풀어뿌라!',
    standard: '이 문제 하나를 못 이겨서 어쩌려고? 네 자존심이 있지, 끝까지 풀어내!',
    meaning: '힘들다고 쉽게 답지 보지 마라. 머리 싸매고 끙끙 앓아봐야 진짜 내 실력 된다.',
    accentTip: "'가오가 있지'에서 특유의 자존심을 긁는 억양을 살려주세요.",
    category: 'study',
    categoryLabel: '공부·취준',
    spiceLevel: 1,
    tag: '#승부욕'
  },
  {
    id: 'study-4',
    dialect: '합격자 명단에 니 이름 박히는 날 상상해봐라. 지금 졸릴 틈이 있나?!',
    standard: '합격자 명단에 네 이름 올라갈 날을 상상해봐. 지금 졸릴 틈이 있어?!',
    meaning: '고생 끝에 맛볼 성취의 짜릿함을 떠올려라. 오늘의 피로는 내일의 훈장이다.',
    accentTip: "'상상해봐라'에서 톤을 낮췄다가 '틈이 있나'에서 확 올려줍니다.",
    category: 'study',
    categoryLabel: '공부·취준',
    spiceLevel: 2,
    tag: '#합격기원'
  },
  {
    id: 'study-5',
    dialect: '대가리 쥐날 때까지 파고들어야 진짜 실력 되는기라. 한 글자라도 더 봐라!',
    standard: '머리에 쥐가 날 때까지 파고들어야 진짜 실력이 되는 거야. 한 줄이라도 더 봐!',
    meaning: '적당히 훑어본 건 시험장 들어가면 다 날아간다. 뼛속까지 새겨 넣어라.',
    accentTip: "'파고들어야'를 끈기 있게 발음하고 '더 봐라'에 온 힘을 실어줍니다.",
    category: 'study',
    categoryLabel: '공부·취준',
    spiceLevel: 2,
    tag: '#열공모드'
  },
  {
    id: 'study-6',
    dialect: '면접관 앞에서 쫄지 마라! 니가 누군지 화끈하게 뽄때를 보여주고 오이라!',
    standard: '면접관 앞에서 기죽지 마! 네가 어떤 사람인지 멋지게 본때를 보여주고 와!',
    meaning: '주눅 들지 말고 당당하게 어깨 펴라. 진심과 열정은 반드시 전해진다.',
    accentTip: "'뽄때를'의 쌍비읍에 힘을 빡 주고 힘차게 격려해주세요.",
    category: 'study',
    categoryLabel: '공부·취준',
    spiceLevel: 1,
    tag: '#면접필승'
  },

  // 4. 운동·다이어트 (Diet)
  {
    id: 'diet-1',
    dialect: '맛있게 묵으믄 0칼로리라꼬? 니 뱃살 보믄 그 소리 쏙 들어갈 낀데?!',
    standard: '맛있게 먹으면 0칼로리라고? 네 뱃살 보면 그 말 쏙 들어갈 텐데?!',
    meaning: '달콤한 위로에 속지 마라. 야식 먹고 자면 다음 날 거울 속엔 후회만 남는다.',
    accentTip: "'쏙 들어갈 낀데'를 익살맞으면서도 찌르는 듯한 고음으로 날리세요.",
    category: 'diet',
    categoryLabel: '운동·다이어트',
    spiceLevel: 3,
    tag: '#야식금지'
  },
  {
    id: 'diet-2',
    dialect: '오늘 딱 한 개만 더 땡기라! 그 마지막 한 개가 니 근육 맹그는기라!',
    standard: '오늘 딱 하나만 더 들어올려! 그 마지막 한 번이 네 근육을 만드는 거야!',
    meaning: '한계라고 느껴질 때 치고 나가는 한 번이 진짜 변화를 만들어낸다.',
    accentTip: "'딱 한 개만'을 악을 쓰듯 외쳐 헬스장 관장님 빙의하세요.",
    category: 'diet',
    categoryLabel: '운동·다이어트',
    spiceLevel: 2,
    tag: '#득근열정'
  },
  {
    id: 'diet-3',
    dialect: '내일 입을 옷 없어가 울지 말고, 오늘 숟가락 딱 내려놔라!',
    standard: '내일 입을 옷 없다고 울지 말고, 오늘 숟가락 딱 내려놔!',
    meaning: '과식한 뒤에 바지 단추 안 잠긴다고 울어봤자 늦었다. 지금 참아라.',
    accentTip: "'딱 내려놔라'에서 식탁을 내리치듯 단호함을 표현하세요.",
    category: 'diet',
    categoryLabel: '운동·다이어트',
    spiceLevel: 2,
    tag: '#식단관리'
  },
  {
    id: 'diet-4',
    dialect: '헬스장 문턱 넘는 게 제일 힘든기라. 일단 운동화 끈부터 묶어뿌라!',
    standard: '운동 시설 문턱 넘는 게 제일 힘들지. 일단 운동화 끈부터 묶어버려!',
    meaning: '가기 싫어 고민할 시간에 신발 신고 밖으로 나가라. 일단 도착하면 다 한다.',
    accentTip: "'묶어뿌라'를 거침없이 후려치듯 시원하게 말합니다.",
    category: 'diet',
    categoryLabel: '운동·다이어트',
    spiceLevel: 1,
    tag: '#출석이반'
  },
  {
    id: 'diet-5',
    dialect: '배고픈 게 아이고 입이 심심한 기다! 시원한 물 한 사발 들이키라!',
    standard: '배고픈 게 아니라 입이 심심한 거야! 시원한 물 한잔 들이켜!',
    meaning: '가짜 배고픔에 속아 배달앱 켜지 마라. 찬물 한 잔 마시고 심호흡해라.',
    accentTip: "'입이 심심한 기다'에서 정곡을 찌르는 억양을 구사하세요.",
    category: 'diet',
    categoryLabel: '운동·다이어트',
    spiceLevel: 2,
    tag: '#가짜식욕퇴치'
  },
  {
    id: 'diet-6',
    dialect: '숨차 죽을 것 같제? 안 죽는다! 심장이 펄떡펄떡 뛰어야 살아있는기라!',
    standard: '숨차서 힘들지? 안 죽어! 심장이 힘차게 뛰어야 살아있는 법이야!',
    meaning: '몸을 괴롭히지 않으면 몸은 절대 안 변한다. 심장의 박동을 즐겨라.',
    accentTip: "'펄떡펄떡'의 생동감을 온몸으로 표현하며 소리치세요.",
    category: 'diet',
    categoryLabel: '운동·다이어트',
    spiceLevel: 2,
    tag: '#유산소폭격'
  },

  // 5. 츤데레 위로 (Comfort)
  {
    id: 'comfort-1',
    dialect: '밥은 뭇나? 힘든 건 알겠는데, 일단 든든하게 묵고 다시 해뿌자!',
    standard: '식사는 챙겼니? 힘든 건 알겠는데, 일단 든든히 먹고 다시 해보자!',
    meaning: '빈속으로는 고민도 안 풀린다. 따뜻한 밥 한 그릇 뚝딱 비우고 힘내라.',
    accentTip: "'밥은 뭇나'를 따스하면서도 투박한 정을 듬뿍 담아 건네세요.",
    category: 'comfort',
    categoryLabel: '츤데레 위로',
    spiceLevel: 1,
    tag: '#밥심이최고'
  },
  {
    id: 'comfort-2',
    dialect: '넘어질 수도 있지 뭘 그라노! 흙먼지 훌훌 털고 인나믄 그만인기라.',
    standard: '넘어질 수도 있지 왜 그래! 흙먼지 훌훌 털고 일어나면 그만이야.',
    meaning: '실패 좀 했다고 세상 안 끝난다. 한번 툭 털고 다시 일어나면 경험치다.',
    accentTip: "'그만인기라'를 대수롭지 않다는 듯 쿨하게 던져주세요.",
    category: 'comfort',
    categoryLabel: '츤데레 위로',
    spiceLevel: 1,
    tag: '#오뚝이정신'
  },
  {
    id: 'comfort-3',
    dialect: '니가 와 모지라노? 남들이 뭐라 캐도 내 눈엔 니가 젤 똑똑하고 멋지데이!',
    standard: '네가 왜 부족해? 남들이 뭐라 해도 내 눈엔 네가 제일 멋져!',
    meaning: '남들의 날 선 말에 스스로를 깎아내리지 마라. 너는 이미 충분히 귀한 사람이다.',
    accentTip: "'젤 똑똑하고 멋지데이'를 진심 어린 눈빛으로 전하듯 읊조리세요.",
    category: 'comfort',
    categoryLabel: '츤데레 위로',
    spiceLevel: 1,
    tag: '#자존감지킴이'
  },
  {
    id: 'comfort-4',
    dialect: '오늘 하루도 욕봤데이. 힘든 거 꾹 참느라 고생했다. 푹 자고 낼 보자!',
    standard: '오늘 하루도 수고 많았어. 힘든 거 참느라 고생했어. 푹 쉬고 내일 보자!',
    meaning: '치열하게 버텨낸 오늘 하루만으로도 넌 박수받을 자격이 차고 넘친다.',
    accentTip: "'욕봤데이'의 진한 온기를 전하며 어깨를 토닥이듯 말하세요.",
    category: 'comfort',
    categoryLabel: '츤데레 위로',
    spiceLevel: 1,
    tag: '#수고했어오늘도'
  },
  {
    id: 'comfort-5',
    dialect: '포기하지만 마라. 늦게 피는 꽃이 젤 화려하고 향기도 깊은 법인기라!',
    standard: '포기하지만 마. 늦게 피는 꽃이 가장 화려하고 향기도 짙은 법이야!',
    meaning: '남들의 속도와 비교하지 마라. 너만의 계절이 오면 세상 누구보다 눈부실 거다.',
    accentTip: "'깊은 법인기라'에서 그윽하고 단단한 울림을 담아주세요.",
    category: 'comfort',
    categoryLabel: '츤데레 위로',
    spiceLevel: 1,
    tag: '#대기만성'
  },
  {
    id: 'comfort-6',
    dialect: '울고 싶으믄 딱 한 번만 찔끔 울고, 눈물 닦고 바로 씩 웃어뿌라!',
    standard: '울고 싶으면 딱 한 번만 시원하게 울고, 눈물 닦고 바로 씩 웃어버려!',
    meaning: '슬픔은 털어내되 낙담에 잠겨있지는 마라. 웃는 얼굴에 복이 붙는다.',
    accentTip: "'씩 웃어뿌라'에서 유쾌한 장난기를 섞어 분위기를 반전시키세요.",
    category: 'comfort',
    categoryLabel: '츤데레 위로',
    spiceLevel: 1,
    tag: '#미소장전'
  },
  {
    id: 'comfort-7',
    dialect: '걱정 사서 하지 마라! 우째 되든 다 살아가는 방법이 다 생기는기라!',
    standard: '미리 걱정 사서 하지 마! 어떻게 되든 다 살아갈 방법이 생기는 법이야!',
    meaning: '아직 오지도 않은 내일의 짐을 오늘 앞당겨 짊어지지 마라. 다 잘 풀린다.',
    accentTip: "'생기는기라'를 호탕하고 여유 있는 톤으로 풀어놓으세요.",
    category: 'comfort',
    categoryLabel: '츤데레 위로',
    spiceLevel: 1,
    tag: '#근심타파'
  },

  // 추가 보너스 명언들
  {
    id: 'bonus-1',
    dialect: '작심삼일이믄 사흘마다 한 번씩 새로 결심하믄 될 거 아이가!',
    standard: '작심삼일이면 3일마다 다시 새롭게 결심하면 되는 거 아니야!',
    meaning: '결심이 무너졌다고 자책하지 마라. 계속 다시 결심하면 그게 평생의 습관이다.',
    accentTip: "'될 거 아이가'를 능청스럽게 맞장구치듯 올려치세요.",
    category: 'sloth',
    categoryLabel: '나태 극복',
    spiceLevel: 1,
    tag: '#작심삼일극복'
  },
  {
    id: 'bonus-2',
    dialect: '소도 언덕이 있어야 비빈다 카는데, 언덕 없으믄 니가 땅을 파서 맹글어라!',
    standard: '소도 기댈 언덕이 있어야 한다지만, 언덕이 없으면 네가 파서 만들어라!',
    meaning: '배경 탓 하지 마라. 기댈 곳이 없다는 건 내가 최초의 기둥이 될 기회다.',
    accentTip: "'맹글어라'에 강한 투지와 흙냄새 나는 끈기를 실어주세요.",
    category: 'work',
    categoryLabel: '일·사업·돈',
    spiceLevel: 3,
    tag: '#자수성가'
  },
  {
    id: 'bonus-3',
    dialect: '남들이 니보고 미칫다 카믄, 제대로 된 방향으로 가고 있는기라!',
    standard: '남들이 너더러 미쳤다고 하면, 제대로 된 방향으로 가고 있는 거야!',
    meaning: '평범함을 거부할 때만 비범한 결과가 나온다. 남들의 참견을 칭찬으로 여겨라.',
    accentTip: "'미칫다 카믄'을 강조하고 고개를 끄덕이며 확신을 줍니다.",
    category: 'work',
    categoryLabel: '일·사업·돈',
    spiceLevel: 2,
    tag: '#독보적존재'
  },
  {
    id: 'bonus-4',
    dialect: '지금 포기하믄 지금까지 개고생한 거 전부 공짜 봉사활동 되는기다!',
    standard: '지금 포기하면 지금까지 고생한 거 전부 헛수고 되는 거야!',
    meaning: '거의 다 왔다. 여기서 주저앉으면 지금까지 흘린 땀이 너무 아깝지 않나?',
    accentTip: "'공짜 봉사활동'을 억울한 표정으로 씹어 뱉듯 말하세요.",
    category: 'study',
    categoryLabel: '공부·취준',
    spiceLevel: 2,
    tag: '#매몰비용회수'
  },
  {
    id: 'bonus-5',
    dialect: '인생 한 번뿐인기라! 찌질하게 굴지 말고 통 크게 함 질러봐라!',
    standard: '인생 단 한 번뿐이야! 비겁하게 굴지 말고 과감하게 도전해봐!',
    meaning: '나중에 침대에서 후회하지 않도록, 오늘 가슴 뛰는 일에 몸을 던져라.',
    accentTip: "'질러봐라'를 속이 뻥 뚫리도록 시원하게 외쳐줍니다.",
    category: 'sloth',
    categoryLabel: '나태 극복',
    spiceLevel: 2,
    tag: '#대담함'
  }
];
