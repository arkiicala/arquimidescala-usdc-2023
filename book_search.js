/** 
 * RECOMMENDATION
 * 
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 * 
 * The Developer Tools in Chrome are available under the "..." menu, 
 * futher hidden under the option "More Tools." In Firefox, they are 
 * under the hamburger (three horizontal lines), also hidden under "More Tools." 
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */ 
 function findSearchTermInBooks(searchTerm, scannedTextObj)
 {
    let results = []; //initialize output array

                //let searchTermLower = searchTerm.toLowerCase(); **for making the search case-insensitive

    for (i = 0; i < scannedTextObj.length; i++) //iterate books in input array
    {

        thisBook = scannedTextObj[i]; //simplify reference to book

        for (j = 0; j < thisBook.Content.length; j++) //iterate lines in the book
        {
            let isHyph = false; //initialize hyphenation condition

            thisLine = thisBook.Content[j].Text; //simplify reference to line

                    //thisLineForSearch = thisLine.toLowerCase(); **for making the search case-insensitive

            if ((thisLine.substring(thisLine.length - 1) == ('-'))) //if line ends with a hyphen to the next line
            {
                isHyph = true;
                thisLine = thisLine.substring(0, thisLine.length - 1); //remove hyphen
                thisLine += thisBook.Content[j+1].Text.split(' ')[0]; //finish hyphenated word
            }

            const words = thisLine.split(" "); //separate line into words
            let found = false

            for(k = 0; k < words.length; k++) //check if search term is not contained inside another word
            {
                if(words[k].indexOf(searchTerm) != -1)
                {
                    if ((words[k].indexOf(searchTerm) == 0) || ((words[k].substring(0, words[k].indexOf(searchTerm)).toLowerCase()) === (words[k].substring(0, words[k].indexOf(searchTerm))).toUpperCase()))
                    {
                        
                        if (words[k].substring(searchTerm.length + 1).toLowerCase() == words[k].substring(searchTerm.length + 1).toUpperCase()) found = true;
                    }
                    
                }
            }

            if (found)
            {
                results.push({
                    "ISBN" : thisBook.ISBN,
                    "Page" : thisBook.Content[j].Page,
                    "Line" : thisBook.Content[j].Line
                });

                if (isHyph)
                {
                    results.push(
                        {
                            "ISBN" : thisBook.ISBN,
                            "Page" : thisBook.Content[j+1].Page,
                            "Line" : thisBook.Content[j+1].Line
                        }
                    )

                    j++;
                };
            }
        }

        
    }

    var result = {
        "SearchTerm": searchTerm,
        "Results" : results//searchResults
    };
    
    return result; 
}

/** Example input object. */
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]
    
/** Example output object */
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}


const myBooksIn = [
    {
        "Title": "Test Book Volume 1",
        "ISBN": "97800005288992",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "It's true that every"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "person expects every-"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "one else to have their same moral compass"
            } 
        ]
    },

    {
        "Title": "Test Book Volume 2",
        "ISBN": "97800005288993",
        "Content": [
            {
                "Page": 32,
                "Line": 8,
                "Text": "thievery and revery both"
            },
            {
                "Page": 32,
                "Line": 9,
                "Text": "contain the substring 'every'"
            },
            {
                "Page": 32,
                "Line": 10,
                "Text": "but should not be recognized by the function. Hyphenation such as 'ev-"
            }, 
            {
                "Page": 32,
                "Line": 11,
                "Text": "ery' should, but not an alternative case such as 'Every'."
            } 
        ]
    },
]

const myBooksOutCaseTest = {
    "SearchTerm": "Every",
    "Results": [
        {
            "ISBN": "97800005288993",
            "Page": 32,
            "Line": 11
        }
    ]
}
/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that 
 * output to the console. We've provided two tests as examples, and 
 * they should pass with a correct implementation of `findSearchTermInBooks`. 
 * 
 * Please add your unit tests below.
 * */

/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test1result);
}

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn); 
if (test2result.Results.length == 1) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test2result.Results.length);
}

/**checking that the right amount of matches are returned */
const test3result = findSearchTermInBooks("every", myBooksIn);
if (test3result.Results.length == 4) {
    console.log("PASS: Test 3");
} else {
    console.log("FAIL: Test 3");
    console.log("Expected:", 4);
    console.log("Received:", test3result.length);
}

/** checking that the function will accurately return no matches */
const test4result = findSearchTermInBooks("o", myBooksIn);
if (test4result.Results.length == 0) {
    console.log("PASS: Test 4");
} else {
    console.log("FAIL: Test 4");
    console.log("Expected:", 0);
    console.log("Received:", test4result.Results.length);
}

/** checking that results are case sensitive */
const test5result = findSearchTermInBooks("Every", myBooksIn);
if (JSON.stringify(myBooksOutCaseTest) === JSON.stringify(test5result)) {
    console.log("PASS: Test 5");
} else {
    console.log("FAIL: Test 5");
    console.log("Expected: ", myBooksOutCaseTest);
    console.log("Received:", test5result);
}