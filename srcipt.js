const tabAll = document.querySelector("#tab-all");
const tabInterview = document.querySelector("#tab-interview");
const tabRejected = document.querySelector("#tab-rejected");

const allList = document.querySelector("#allList");
const interviewList = document.querySelector("#interviewList");
const rejectedList = document.querySelector("#rejectedList");

const totalCount = document.querySelector("#totalCount");
const interviewCount = document.querySelector("#interviewCount");
const rejectedCount = document.querySelector("#rejectedCount");
const jobsCountText = document.querySelector("#jobsCountText");

const interviewEmpty = document.querySelector("#interviewEmpty");
const rejectedEmpty = document.querySelector("#rejectedEmpty");

const tabs = document.querySelectorAll(".tab[data-tab]");
let activeTab = "all";


function statusBadge(status) {
  if (status === "interview") {
    return `<span class="badge badge-success badge-outline">INTERVIEW</span>`;
  }
  if (status === "rejected") {
    return `<span class="badge badge-error badge-outline">REJECTED</span>`;
  }
  return `<span class="badge badge-ghost">NOT APPLIED</span>`;
}


function updateCount() {
  const total = allList.children.length;

  totalCount.innerText = total;
  interviewCount.innerText = interviewList.children.length;
  rejectedCount.innerText = rejectedList.children.length;

  if (activeTab === "all") {
    jobsCountText.innerText = total + " jobs";
  }
  if (activeTab === "interview") {
    jobsCountText.innerText = interviewList.children.length + " of " + total + " jobs";
  }
  if (activeTab === "rejected") {
    jobsCountText.innerText = rejectedList.children.length + " of " + total + " jobs";
  }

  interviewEmpty.style.display = interviewList.children.length > 0 ? "none" : "flex";
  rejectedEmpty.style.display = rejectedList.children.length > 0 ? "none" : "flex";
}


function showTab(name) {
  activeTab = name;

  tabAll.classList.toggle("hidden", name !== "all");
  tabInterview.classList.toggle("hidden", name !== "interview");
  tabRejected.classList.toggle("hidden", name !== "rejected");

  tabs.forEach(t => t.classList.remove("tab-active"));
  document.querySelector(`.tab[data-tab="${name}"]`)?.classList.add("tab-active");

  updateCount();
}


tabs.forEach(tab => {
  tab.addEventListener("click", () => showTab(tab.dataset.tab));
});


document.addEventListener("click", function (e) {
  const btn = e.target.closest("button[data-action]");
  if (!btn) return;

  const action = btn.dataset.action; 
  const card = btn.closest(".card");
  if (!card) return;

  const id = card.dataset.id;

 
  if (action === "delete") {
    card.remove();

    const c1 = interviewList.querySelector(`.card[data-id="${id}"]`);
    const c2 = rejectedList.querySelector(`.card[data-id="${id}"]`);
    if (c1) c1.remove();
    if (c2) c2.remove();

    updateCount();
    return;
  }

  
  if (action === "interview" || action === "rejected") {
    
    const badgeWrap = card.querySelector(".badgeWrap");
    badgeWrap.innerHTML = statusBadge(action);

    
    const oldInInterview = interviewList.querySelector(`.card[data-id="${id}"]`);
    const oldInRejected = rejectedList.querySelector(`.card[data-id="${id}"]`);
    if (oldInInterview) oldInInterview.remove();
    if (oldInRejected) oldInRejected.remove();

    
    const clone = card.cloneNode(true);
    clone.querySelector(".badgeWrap").innerHTML = statusBadge(action);

    
    if (action === "interview") interviewList.appendChild(clone);
    if (action === "rejected") rejectedList.appendChild(clone);

    updateCount();
  }
});


showTab("all");
updateCount();