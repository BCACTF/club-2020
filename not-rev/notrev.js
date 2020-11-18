function checkFlag() {
    const answer = prompt("Flag?");
    if (answer.split("").reverse().join("") === "}dofuhoirhuirh_51ht_0d_2_w0h_ver3_ksa_0g{ftcacb") {
        alert("Congratulations, you got the flag!");
    } else {
        alert("Try harder next time.");
    }
}