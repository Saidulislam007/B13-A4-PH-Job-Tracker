 
## Answers to Questions

### 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

Answer-getElementById() - একটি id select করে, single element return করে |
       getElementsByClassName() - একই class-এর সব element HTMLCollection return করে |
       querySelector() - প্রথম matching CSS selector element return করে |
       querySelectorAll() - সব matching CSS selector element NodeList return করে |

### 2. How do you create and insert a new element into the DOM?
Answer-const newDiv = document.createElement("div");
      newDiv.innerText = "Hello";
      document.body.appendChild(newDiv);

### 3. What is Event Bubbling? And how does it work?
Answer-Child element-এ event হলে সেটা parent document পর্যন্ত propagate উপরে ওঠে করে।

### 4. What is Event Delegation in JavaScript? Why is it useful?
Answer-প্রতিটায় আলাদা addEventListener না দিয়ে  আমরা শুধু তাদের parent div-এ listener বসাবো।    

### 5. What is the difference between preventDefault() and stopPropagation() methods?
Answer-preventDefault(),browser-এর default behaviour বন্ধ করে।
       event bubble হয়ে parent element এ যাওয়া বন্ধ করে।
