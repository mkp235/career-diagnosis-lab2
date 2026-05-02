(function () {
  const config = window.SITE_CONFIG || {};

  const articleLinks = {
    salary: {
      title: "第二新卒が転職で年収アップする方法",
      url: "../articles/salary-up.html",
      text: "年収を上げる求人選びと、面接で評価される経験の伝え方を整理できます。"
    },
    it: {
      title: "未経験からIT職種に転職するなら何がおすすめか",
      url: "../articles/it-career.html",
      text: "エンジニア以外の入口も含めて、20代未経験から狙いやすい職種を確認できます。"
    },
    interview: {
      title: "20代の面接でよく聞かれる質問と回答例",
      url: "../articles/interview-questions.html",
      text: "自己PR、転職理由、弱みの答え方を、面接前にさっと見直せます。"
    }
  };

  const salaryRanks = {
    A: {
      label: "Aランク",
      title: "年収アップを前向きに狙える状態です",
      copy: "いまの経験をそのまま低く見積もる必要はありません。第二新卒でも、任された業務、改善したこと、周囲から評価されたことを具体的に話せる人は、条件の良い求人に届きやすくなります。\n\n大切なのは「もっと良い会社に行きたい」だけで終わらせず、次の環境で何を伸ばしたいかまで言葉にすることです。求人を比較しながら、自分の経験が評価される業界や職種を見つけていきましょう。",
      actions: ["職務経歴を数字とエピソードで3つ書き出す", "同じ職種だけでなく隣接職種の求人も比較する", "希望年収は理由とセットで伝えられるようにする"]
    },
    B: {
      label: "Bランク",
      title: "見せ方を整えると年収アップが狙えます",
      copy: "年収アップの余地はあります。ただし、今のまま応募数だけ増やすより、経験の見せ方を整えた方が結果につながりやすいタイプです。\n\n第二新卒の選考では、すごい実績よりも「自分なりに考えて動いた経験」が見られます。前職での小さな改善や、任された範囲で工夫したことを言語化しておきましょう。",
      actions: ["前職で褒められたことや任されたことを棚卸しする", "求人票の必須条件と歓迎条件を分けて読む", "面接で話す転職理由を前向きな言葉に変える"]
    },
    C: {
      label: "Cランク",
      title: "まずは市場価値の棚卸しから始めましょう",
      copy: "すぐに高年収だけを狙うより、まずは自分の強みを見つけ直すタイミングです。経験が浅くても、顧客対応、事務処理、改善提案、チーム連携など、別の職種で評価される材料はあります。\n\n焦って応募するより、応募先に合わせて「なぜその仕事なのか」を説明できる状態にすると、通過率が上がりやすくなります。",
      actions: ["できる業務、好きな業務、苦手な業務を分けて書く", "未経験歓迎だけでなく研修やサポート体制も確認する", "志望動機のたたき台を作って方向性を固める"]
    },
    D: {
      label: "Dランク",
      title: "情報収集と準備で伸びしろを作れる状態です",
      copy: "今はまだ転職で年収アップを強く狙うより、準備を増やすほど可能性が広がる段階です。これは悪い結果ではなく、動き方を間違えなければ伸びしろが大きいということです。\n\nまずは自分に合う職種や働き方を知り、面接で話せる経験を整理しましょう。1週間だけでも求人を見比べると、必要なスキルや言葉がかなり見えてきます。",
      actions: ["気になる求人を10件保存して共通点を探す", "現職で1つだけ改善経験を作る", "転職理由をネガティブな本音から前向きな表現に整える"]
    }
  };

  const fitRanks = {
    A: {
      label: "Aランク",
      prefix: "かなり相性が良いです",
      actions: ["求人票で仕事内容と研修内容を確認する", "関連する入門学習を1週間だけ試す", "前職経験がどう活きるかを一文でまとめる"]
    },
    B: {
      label: "Bランク",
      prefix: "入口として十分に検討できます",
      actions: ["似た職種を2つ比較して向き不向きを見る", "未経験歓迎求人の必須条件を書き出す", "面接で話せる学習意欲のエピソードを用意する"]
    },
    C: {
      label: "Cランク",
      prefix: "準備次第で狙いやすくなります",
      actions: ["仕事内容の動画や記事を見て具体的な業務を知る", "今の強みが活きるIT職種をもう一つ探す", "応募前に小さな学習記録を作る"]
    },
    D: {
      label: "Dランク",
      prefix: "まずは職種理解から始めるのがおすすめです",
      actions: ["IT職種の種類をざっくり把握する", "苦手な働き方を先に明確にする", "サポート職や営業職など広めの入口も見る"]
    }
  };

  function setText(selector, text) {
    document.querySelectorAll(selector).forEach((el) => {
      el.textContent = text;
    });
  }

  function setHref(selector, href) {
    document.querySelectorAll(selector).forEach((el) => {
      el.setAttribute("href", href);
    });
  }

  function setAttribute(selector, name, value) {
    document.querySelectorAll(selector).forEach((el) => {
      el.setAttribute(name, value);
    });
  }

  function safeUrl(url) {
    const value = String(url || "").trim();
    if (!value || value.includes("ここに")) return "#";
    return value;
  }

  function setupGlobalUi() {
    const mainCareer = config.mainCareer || {};
    const primaryText = mainCareer.buttonText || config.cta?.primaryText || "第二新卒向けの無料相談を見てみる";
    const primaryUrl = safeUrl(mainCareer.url || config.cta?.primaryUrl);
    const secondaryUrl = safeUrl(config.cta?.secondaryUrl);

    setText("[data-site-name]", config.siteName || "20代キャリア診断ラボ");
    setText("[data-cta-primary-text]", primaryText);
    setText("[data-cta-secondary-text]", config.cta?.secondaryText || "未経験IT向けの選択肢を見てみる");
    setText("[data-cta-note]", config.cta?.note || "");
    setHref("[data-cta-primary-url]", primaryUrl);
    setHref("[data-cta-secondary-url]", secondaryUrl);
    setAttribute("[data-cta-primary-url], [data-cta-secondary-url]", "rel", "sponsored nofollow");

    const toggle = document.querySelector("[data-nav-toggle]");
    const nav = document.querySelector("[data-nav]");
    if (toggle && nav) {
      toggle.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(isOpen));
      });
    }
  }

  function values(form) {
    return Object.fromEntries(new FormData(form).entries());
  }

  function numberValue(value) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  function rankFromScore(score) {
    if (score >= 82) return "A";
    if (score >= 66) return "B";
    if (score >= 50) return "C";
    return "D";
  }

  function textRank(score) {
    if (score >= 9) return "A";
    if (score >= 6) return "B";
    if (score >= 3) return "C";
    return "D";
  }

  function ensureResultBlock(result, className, afterSelector) {
    let block = result.querySelector("." + className);
    if (block) return block;
    block = document.createElement("div");
    block.className = className;
    const after = result.querySelector(afterSelector);
    if (after && after.parentNode) {
      after.insertAdjacentElement("afterend", block);
    } else {
      result.appendChild(block);
    }
    return block;
  }

  function renderActions(result, actions) {
    const block = ensureResultBlock(result, "result-actions-list", "[data-result-copy]");
    block.innerHTML = "";
    const heading = document.createElement("h3");
    heading.textContent = "おすすめ行動";
    const list = document.createElement("ol");
    actions.forEach((action) => {
      const item = document.createElement("li");
      item.textContent = action;
      list.appendChild(item);
    });
    block.append(heading, list);
  }

  function renderNextArticle(result, article) {
    const block = ensureResultBlock(result, "next-article", ".result-actions-list");
    block.innerHTML = "";
    const heading = document.createElement("h3");
    heading.textContent = "次に読むべき記事";
    const link = document.createElement("a");
    link.href = article.url;
    link.textContent = article.title;
    const text = document.createElement("p");
    text.textContent = article.text;
    block.append(heading, link, text);
  }

  function showResult(form, data) {
    const result = form.parentElement.querySelector("[data-result]");
    if (!result) return;
    result.querySelector("[data-result-score]").textContent = data.score;
    result.querySelector("[data-result-title]").textContent = data.title;
    result.querySelector("[data-result-copy]").textContent = data.copy;
    result.querySelector("[data-share-copy]").textContent = data.share;
    renderActions(result, data.actions);
    renderNextArticle(result, data.article);
    result.classList.add("is-visible");
    result.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const toolHandlers = {
    salary(form) {
      const v = values(form);
      let score = 32;
      score += numberValue(v.age) <= 26 ? 12 : 8;
      score += numberValue(v.income) < 350 ? 16 : numberValue(v.income) < 450 ? 11 : 5;
      score += numberValue(v.experience) >= 2 ? 12 : 6;
      score += v.industry === "sales" || v.industry === "it" ? 12 : 8;
      score += v.action === "active" ? 17 : v.action === "soon" ? 11 : 4;
      score = Math.min(score, 96);

      const rank = rankFromScore(score);
      const result = salaryRanks[rank];
      showResult(form, {
        score: result.label + " / " + score + "点",
        title: result.title,
        copy: result.copy,
        actions: result.actions,
        article: articleLinks.salary,
        share: "年収アップ可能性は" + result.label + "でした。20代キャリア診断ラボで無料チェック。"
      });
    },

    itFit(form) {
      const v = values(form);
      const scores = { engineer: 0, director: 0, sales: 0, support: 0 };
      scores.engineer += v.logic === "yes" ? 3 : 1;
      scores.director += v.organize === "yes" ? 3 : 1;
      scores.sales += v.talk === "yes" ? 3 : 1;
      scores.support += v.support === "yes" ? 3 : 1;
      scores.engineer += v.study === "daily" ? 3 : v.study === "weekly" ? 2 : 1;
      scores.director += v.study === "weekly" ? 2 : 1;
      scores.sales += v.talk === "yes" ? 2 : 0;
      scores.support += v.support === "yes" ? 2 : 0;

      const labels = {
        engineer: "Webエンジニア・テスター",
        director: "Webディレクター・PMアシスタント",
        sales: "IT営業・カスタマーサクセス",
        support: "ヘルプデスク・社内SEサポート"
      };
      const advice = {
        engineer: "論理的に考えることや、コツコツ学ぶ姿勢が活きるタイプです。最初から完璧な開発職を狙うより、テスター、運用、保守、Web制作補助など実務に近い入口を選ぶと現実的です。",
        director: "情報を整理して、人と人の間に立つ力が活きます。制作進行、要件整理、PMアシスタントのような職種なら、未経験でも前職の調整経験を評価されやすいです。",
        sales: "会話力や相手の課題を聞き出す力が武器になります。IT営業やカスタマーサクセスは、業界未経験でも営業、販売、接客経験を転用しやすい入口です。",
        support: "相手の困りごとを受け止める力が強みです。ヘルプデスクやテクニカルサポートでITの基礎を身につけると、社内SE補助や運用職にも広げやすくなります。"
      };
      const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
      const best = sorted[0][0];
      const rank = rankFromScore(sorted[0][1] * 12);
      const rankInfo = fitRanks[rank];

      showResult(form, {
        score: rankInfo.label,
        title: labels[best] + "が向いていそうです",
        copy: rankInfo.prefix + "。\n\n" + advice[best] + "\n\n20代の未経験転職では、最初の職種を一生の正解にしようとしなくて大丈夫です。まずはIT業界の中で経験を作り、次の選択肢を増やしていきましょう。",
        actions: rankInfo.actions,
        article: articleLinks.it,
        share: "未経験IT職種の適性は「" + labels[best] + "」でした。"
      });
    },

    reason(form) {
      const v = values(form);
      const raw = (v.reason || "").trim();
      const focus = v.focus || "growth";
      const score = textRank((raw.length > 12 ? 4 : raw.length > 0 ? 2 : 0) + (focus ? 4 : 0));
      const rankInfo = {
        A: ["かなり面接向けに整えやすい内容です", ["元の不満は短くし、次にやりたいことを長めに話す", "具体的な成長テーマを1つ入れる", "応募先で実現したいことにつなげる"]],
        B: ["少し整えるだけで前向きに伝えられます", ["不満の表現をやわらげる", "学びや気づきを一文足す", "転職後に改善したいことを具体化する"]],
        C: ["そのままだと誤解されやすいので変換が有効です", ["会社批判に聞こえる言葉を避ける", "自分が努力した点を入れる", "次の環境で大事にしたい軸を決める"]],
        D: ["まずは退職理由の方向性を決めましょう", ["本音を箇条書きで出す", "成長、社風、働き方のどれに近いか選ぶ", "面接では未来の話を多めにする"]]
      }[score];
      const templates = {
        growth: "前職では一定の経験を積む中で、より専門性を高められる環境で挑戦したいと考えるようになりました。これまでの経験を土台にしながら、任される範囲を広げ、成果につながるスキルを身につけたいと思っています。",
        culture: "前職で働く中で、自分がより力を発揮できる環境やチームでの進め方について考える機会が増えました。周囲と協力しながら改善に向き合える環境で、長く前向きに貢献したいと考えています。",
        work: "働き方を見直す中で、継続的に成果を出せる環境で成長したいと考えるようになりました。業務の質を高めながら、学び続けられる職場で力を発揮したいと思っています。"
      };
      const prefix = raw ? "元の退職理由: " + raw + "\n\n" : "";
      showResult(form, {
        score: score + "ランク",
        title: rankInfo[0],
        copy: prefix + templates[focus] + "\n\n面接では、退職理由を長く説明しすぎないことが大切です。過去の不満よりも、次の環境でどう成長したいかに話を移すと印象が安定します。",
        actions: rankInfo[1],
        article: articleLinks.interview,
        share: "退職理由を面接向けの前向き表現に変換しました。"
      });
    },

    motivation(form) {
      const v = values(form);
      const company = v.company || "貴社";
      const job = v.job || "希望職種";
      const strength = v.strength || "これまでの経験";
      const value = v.value || "若手でも挑戦できる環境";
      const filled = [v.company, v.job, v.strength, v.value].filter((item) => (item || "").trim()).length;
      const rank = textRank(filled * 3);
      const actions = {
        A: ["企業の事業内容に触れる一文を足す", "入社後に貢献したい業務を具体化する", "自分の経験と応募先の接点を強める"],
        B: ["応募先ならではの魅力をもう一つ加える", "強みを裏付けるエピソードを短く入れる", "最後を入社後の行動で締める"],
        C: ["会社名と職種を具体的に入れる", "使い回しに見える表現を減らす", "なぜその業界なのかを一文足す"],
        D: ["応募先の求人票を読み直す", "自分の強みを一つだけ選ぶ", "志望理由を待遇以外の言葉にする"]
      }[rank];
      const copy = company + "を志望する理由は、" + value + "の中で" + job + "として成長し、これまでの経験を活かせると感じたためです。\n\n前職では、" + strength + "を活かしながら、周囲と連携して業務に取り組んできました。まだ経験を広げている段階ではありますが、20代ならではの吸収力と行動量を活かし、早期に業務を覚えて貢献したいと考えています。\n\n特に、任されたことをただこなすのではなく、自分なりに改善点を見つけて動ける人材を目指したいです。";
      showResult(form, {
        score: rank + "ランク",
        title: "志望動機のたたき台ができました",
        copy,
        actions,
        article: articleLinks.interview,
        share: "志望動機メーカーで応募先に合わせた文章を作りました。"
      });
    },

    interview(form) {
      const v = values(form);
      const question = v.question || "selfpr";
      const strength = v.strength || "主体的に行動できること";
      const episode = v.episode || "前職で課題に向き合い、改善に取り組んだ経験";
      const future = v.future || "早く戦力化し、成果に貢献すること";
      const filled = [v.strength, v.episode, v.future].filter((item) => (item || "").trim()).length;
      const rank = textRank(filled * 3);
      const actions = {
        A: ["回答を60秒以内で話せる長さに調整する", "数字や固有名詞を1つ入れて具体性を上げる", "応募先でどう活かすかを最後に足す"],
        B: ["エピソードの背景を一文だけ加える", "自分が取った行動を主語にして話す", "締めを前向きな貢献意欲にする"],
        C: ["結論から話す形に並べ替える", "抽象的な強みを具体的な行動に置き換える", "退職理由や志望動機と矛盾しないか確認する"],
        D: ["強みを一つに絞る", "前職での小さな成功体験を探す", "回答を丸暗記せずキーワードで覚える"]
      }[rank];
      const templates = {
        selfpr: "私の強みは、" + strength + "です。\n\n具体的には、" + episode + "があります。この経験から、状況を整理して自分にできる行動を積み重ねる大切さを学びました。入社後もこの強みを活かし、" + future + "を目指します。",
        change: "転職を考えた理由は、これまでの経験を活かしながら、より成長できる環境で挑戦したいと考えたためです。\n\n" + episode + "を通じて、自分は" + strength + "にやりがいを感じると分かりました。次の環境では、" + future + "を実現したいです。",
        weakness: "私の課題は、慎重になりすぎる場面があることです。\n\n一方で、" + episode + "を通じて、優先順位を決めて行動する意識を持つようになりました。現在は確認の質を保ちつつ、早く動くことを意識しています。入社後も改善を続け、" + future + "につなげたいです。"
      };
      showResult(form, {
        score: rank + "ランク",
        title: "面接で使える回答のたたき台です",
        copy: templates[question],
        actions,
        article: articleLinks.interview,
        share: "面接回答メーカーで回答例を作りました。"
      });
    }
  };

  function setupForms() {
    document.querySelectorAll("[data-tool-form]").forEach((form) => {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const type = form.getAttribute("data-tool-form");
        if (toolHandlers[type]) toolHandlers[type](form);
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    setupGlobalUi();
    setupForms();
  });
})();
