describe("엔터 페이지 E2E 테스트", () => {
  const randomNumber = Math.floor(1 + Math.random() * 1000) + "";
  function generalLogin() {
    cy.get("img").should("exist");
    cy.get(".mt-12").should("exist");
    cy.get(".flex-col.items-center").should("exist");
    cy.get(".flex-col.items-center > > button")
      .eq(0)
      .should("exist")
      .contains("일반");
    cy.get(".flex-col.items-center > > button")
      .eq(1)
      .should("exist")
      .contains("이메일");
    cy.get(".space-y-4").should("exist");
    cy.get(":nth-child(1) > .mb-1").should("exist").contains("아이디");
    cy.get("#username").should("exist");
    cy.get(":nth-child(2) > .mb-1").should("exist").contains("비밀번호");
    cy.get("#password").should("exist");
    cy.get(".space-y-4 > button").should("exist").contains("로그인");
    cy.get(":nth-child(3) > :nth-child(1) > .relative")
      .should("exist")
      .contains("로그인 옵션");
    cy.get(".grid > .flex").should("exist").contains("회원가입");
  }

  beforeEach(() => {
    // 아이폰 12 프로 뷰포트
    cy.viewport(390, 844);
    cy.visit("/enter");
    cy.intercept("/_next/static/development/*").as("req");
    cy.wait(["@req"], { responseTimeout: 25000 });
    cy.intercept("/api/users/signin").as("signin");
    cy.intercept("/api/users/signup").as("signup");
    cy.intercept("/api/products").as("products");
  });

  it("엔터 페이지 렌더링 테스트", () => {
    // 일반 로그인 탭 렌더링 테스트
    generalLogin();

    // 이메일 로그인 탭 렌더링 테스트
    cy.get(".flex-col.items-center > > button").eq(1).click();
    cy.get("img").should("exist");
    cy.get(".mt-12").should("exist");
    cy.get(".flex-col.items-center").should("exist");
    cy.get(".flex-col.items-center > > button")
      .eq(0)
      .should("exist")
      .contains("일반");
    cy.get(".flex-col.items-center > > button")
      .eq(1)
      .should("exist")
      .contains("이메일");
    cy.get(".space-y-4").should("exist");
    cy.get(":nth-child(1) > .mb-1").should("exist").contains("이메일 주소");
    cy.get("#email").should("exist");
    cy.get(".space-y-4 > button")
      .should("exist")
      .contains("단발성 로그인 토큰 요청");
    cy.get(":nth-child(3) > :nth-child(1) > .relative")
      .should("exist")
      .contains("로그인 옵션");
    cy.get(".grid > .flex").should("exist").contains("회원가입");

    // 회원가입 탭 렌더링 테스트
    cy.get(".grid > .flex").should("exist").contains("회원가입").click();
    cy.get("img").should("exist");
    cy.get(".mt-12").should("exist");
    cy.get(".flex-col.items-center").should("exist");
    cy.get(".flex-col.items-center > > button")
      .eq(0)
      .should("exist")
      .contains("일반");
    cy.get(".flex-col.items-center > > button")
      .eq(1)
      .should("exist")
      .contains("이메일");
    cy.get(".space-y-4").should("exist");
    cy.get(":nth-child(1) > .mb-1").should("exist").contains("아이디");
    cy.get("#username").should("exist");
    cy.get(":nth-child(2) > .mb-1").should("exist").contains("비밀번호");
    cy.get("#password").should("exist");
    cy.get(":nth-child(3) > .mb-1").should("exist").contains("닉네임");
    cy.get("#name").should("exist");
    cy.get(":nth-child(4) > .mb-1").should("exist").contains("이메일 주소");
    cy.get("#email").should("exist");
    cy.get(":nth-child(4) > :nth-child(1) > .relative")
      .should("exist")
      .contains("로그인 옵션");
    cy.get(".space-y-4 > button").should("exist").contains("회원가입");
    cy.get(".grid > .flex").should("exist").contains("회원가입");
  });

  it("일반 로그인 테스트", () => {
    cy.get("#username").should("exist").type("admin01");
    cy.get("#password").should("exist").type("admin01");
    cy.get(".space-y-4 > button").should("exist").contains("로그인").click();
    cy.wait(["@signin"], { responseTimeout: 25000 });
    cy.wait(["@products"], { responseTimeout: 25000 });
    cy.url();
  });

  it("이메일 로그인 테스트", () => {
    // 메일로 받는 토큰을 받아야 함으로 다른 방법이 필요해 보임.
    // 보류
  });

  it("회원가입 및 로그인 테스트", () => {
    cy.get(".grid > .flex").should("exist").contains("회원가입").click();
    cy.get("#username").should("exist").type(`testUser${randomNumber}`);
    cy.get("#password").should("exist").type("testPassword1");
    cy.get("#name").should("exist").type(`testUser${randomNumber}`);
    cy.get("#email").should("exist").type(`testEmail${randomNumber}@test.test`);
    cy.get(".space-y-4 > button").should("exist").contains("회원가입").click();
    cy.wait(["@signup"], { responseTimeout: 25000 });
    // 회원가입 후 일반 로그인 탭으로 전환됨
    generalLogin();
    // 회원가입 시 해당 로그인의 정보들은 폼에 입력되어 있음.
    cy.get(".space-y-4 > button").should("exist").contains("로그인").click();
    cy.wait(["@signin"], { responseTimeout: 25000 });
    cy.wait(["@products"], { responseTimeout: 25000 });
    cy.url();
  });
});
