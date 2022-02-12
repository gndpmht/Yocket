/// <reference types="cypress" />
describe('Testing API Endpoints Using Cypress', () => {

    var id;
    var res;
    const FIRST_NAME = "Gyandeep";
    const LAST_NAME = "Mehta";
    const TOTAL_PRICE = 3500;
    const DEPOSIT_PAID = true;
    const BOOKING_DATES = {
        "checkin": "2022-01-01",
        "checkout": "2022-01-01"
    };
    const FALSE_BOOKING_DATES = {
        "checkin": "2023-01-01",
        "checkout": "2022-01-01"
    };

    const BAD_BOOKING_DATES = {
        "checkin": "2023-1-01",
        "checkout": "2022-1-01"
    };
    const ADDITIONAL_NEEDS = "Breakfast";


    it('Test GET Request', () => {
        cy.request('https://restful-booker.herokuapp.com/booking')
            .then((response) => {
            expect(response.status).to.eq(200)
                expect(response.body[0]).to.have.all.keys(
                    'bookingid'
                )
                id = response.body[0]['bookingid']
                
        })
    })

    it('Test GET Request', () => {
        cy.request(`https://restful-booker.herokuapp.com/booking/${id}`)
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.all.keys(
                    'firstname', 'lastname', 'totalprice', 'depositpaid', 'bookingdates','additionalneeds'
                )
                res = response.body
            })
    })

    it('Test POST Request', () => {
        cy.request({
            method: 'POST',
            url: 'https://restful-booker.herokuapp.com/booking',
            headers: { contenttype: 'application / json' },
            body: {
                "firstname": FIRST_NAME,
                "lastname": LAST_NAME,
                "totalprice": TOTAL_PRICE,
                "depositpaid": DEPOSIT_PAID,
                "bookingdates": BOOKING_DATES,
                "additionalneeds": ADDITIONAL_NEEDS
        }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).has.property("bookingid");
            expect(response.body).has.property("booking");
            expect(response.body.booking).has.property("firstname", FIRST_NAME);
            expect(response.body.booking).has.property("lastname", LAST_NAME);
            expect(response.body.booking).has.property("totalprice", TOTAL_PRICE);
            expect(response.body.booking).has.property("depositpaid", DEPOSIT_PAID);
            expect(response.body.booking.bookingdates).has.property("checkin", BOOKING_DATES['checkin']);
            expect(response.body.booking.bookingdates).has.property("checkout", BOOKING_DATES['checkout']);
            expect(response.body.booking).has.property("additionalneeds", ADDITIONAL_NEEDS);
        })
})


it('Test FAILED POST Request', () => {

    cy.request({
        method: 'POST',
        url: 'https://restful-booker.herokuapp.com/booking',
        headers: { contenttype: 'application / json' },
        
        body: {
                "firstname": FIRST_NAME,
                "lastname": LAST_NAME,
                "totalprice": TOTAL_PRICE,
                "depositpaid": DEPOSIT_PAID,
                "bookingdates": FALSE_BOOKING_DATES,
                "additionalneeds": ADDITIONAL_NEEDS
        }
    }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).not.has.property("bookingdates");
    })
})


it('Test FAILED POST Request 2', () => {

    cy.request({
        method: 'POST',
        url: 'https://restful-booker.herokuapp.com/booking',
        headers: { contenttype: 'application / json' },
        
        body: {
                "firstname": FIRST_NAME,
                "lastname": LAST_NAME,
                "totalprice": TOTAL_PRICE,
                "depositpaid": DEPOSIT_PAID,
                "bookingdates": BAD_BOOKING_DATES,
                "additionalneeds": ADDITIONAL_NEEDS
        }
    }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).not.has.property("bookingdates");
    })
})
    
    it('Test PUT Request', () => {
res['firstname'] = "piyush";
        cy.request({
        method: 'PUT',
        url: `https://restful-booker.herokuapp.com/booking/${id}`,
        headers:{
            contenttype: 'application / json',
            accept: 'application/json',
            authorization: 'Basic YWRtaW46cGFzc3dvcmQxMjM='
        },
        body: res
    }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).has.property("firstname", res.firstname);
        expect(response.body).has.property("lastname",  res.lastname);
        expect(response.body).has.property("totalprice",  res.totalprice);
        expect(response.body).has.property("depositpaid",  res.depositpaid);
        expect(response.body.bookingdates).has.property("checkin",  res.bookingdates.checkin);
        expect(response.body.bookingdates).has.property("checkout",  res.bookingdates.checkout);
        expect(response.body).has.property("additionalneeds",  res.additionalneeds);
    })
})

it('Test PATCH Request', () => {
    
         cy.request({
         method: 'PATCH',
         url: `https://restful-booker.herokuapp.com/booking/${id}`,
         headers:{
             contenttype: 'application / json',
             accept: 'application/json',
             authorization: 'Basic YWRtaW46cGFzc3dvcmQxMjM='
         },
         body: {
             "lastname": "Green"
         }
     }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).has.property("firstname", res.firstname);
        expect(response.body).has.property("lastname",  "Green");
        expect(response.body).has.property("totalprice",  res.totalprice);
        expect(response.body).has.property("depositpaid",  res.depositpaid);
        expect(response.body.bookingdates).has.property("checkin",  res.bookingdates.checkin);
        expect(response.body.bookingdates).has.property("checkout",  res.bookingdates.checkout);
        expect(response.body).has.property("additionalneeds",  res.additionalneeds);
     })
 })

it('Test DELETE Request', () => {
    cy.request({
        method: 'DELETE',
        url: `https://restful-booker.herokuapp.com/booking/${id}`,
        headers: {
           
            authorization: 'Basic YWRtaW46cGFzc3dvcmQxMjM='
        }
    }).then((response) => {
        expect(response.status).to.eq(201)
            
        })
})

})