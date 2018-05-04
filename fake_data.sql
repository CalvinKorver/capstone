-- CLIENTS

insert into tutorial_caseOutcome(caseOutcomeName) VALUES("Dismissed");
insert into tutorial_caseOutcome(caseOutcomeName) VALUES("Entered Plea Bargain");
insert into tutorial_caseOutcome(caseOutcomeName) VALUES("Compromise of Misdemeanor");
insert into tutorial_caseOutcome(caseOutcomeName) VALUES("Stipulated Order of Continuance");

insert into tutorial_pretrialstatus(preTrialStatusName) VALUES("Pre-Trial Continuance");
insert into tutorial_pretrialstatus(preTrialStatusName) VALUES("Resolved Case");
insert into tutorial_pretrialstatus(preTrialStatusName) VALUES("Failed to Appear");
insert into tutorial_pretrialstatus(preTrialStatusName) VALUES("Set for Trial");

insert into tutorial_sentencingStatus(sentencingStatusName) Values("Found not Guilty");
insert into tutorial_sentencingStatus(sentencingStatusName) Values("Found guilty of lesser-included offense");
insert into tutorial_sentencingStatus(sentencingStatusName) Values("Found guilty as charged");


insert into tutorial_court(courtName) VALUES ("King County");
insert into tutorial_court(courtName) VALUES("District Court");
insert into tutorial_court(courtName) VALUES("Court A");
insert into tutorial_court(courtName) VALUES("Court B");



insert into tutorial_client (FirstName, LastName, DateOfBirth, StreetAddress, State, Zipcode, Country) values ('Olenolin', 'Tunnock', '05/31/1979', '2728 American Ash Lane', 'WA', '03081', 'United States');
insert into tutorial_client (FirstName, LastName, DateOfBirth, StreetAddress, State, Zipcode, Country) values ('Dana', 'Alflat', '03/24/1970', '6 Goodland Center', 'FL', '01676', 'United States');
insert into tutorial_client (FirstName, LastName, DateOfBirth, StreetAddress, State, Zipcode, Country) values ('Colman', 'Silversmidt', '08/15/1972', '188 Stone Corner Way', 'TX', '60174', 'United States');
insert into tutorial_client (FirstName, LastName, DateOfBirth, StreetAddress, State, Zipcode, Country) values ('Karola', 'Lomb', '08/08/1979', '83 Sachs Terrace', 'TX', '50840', 'United States');
insert into tutorial_client (FirstName, LastName, DateOfBirth, StreetAddress, State, Zipcode, Country) values ('Minny', 'Boswood', '08/30/1965', '17 Pawling Trail', 'NC', '39646', 'United States');
insert into tutorial_client (FirstName, LastName, DateOfBirth, StreetAddress, State, Zipcode, Country) values ('Brande', 'Anstice', '08/20/1984', '468 Oxford Crossing', 'OR', '71653', 'United States');
insert into tutorial_client (FirstName, LastName, DateOfBirth, StreetAddress, State, Zipcode, Country) values ('Gnni', 'Skotcher', '08/20/1973', '79040 Elmside Plaza', 'AL', '08890', 'United States');
insert into tutorial_client (FirstName, LastName, DateOfBirth, StreetAddress, State, Zipcode, Country) values ('Merrie', 'Swanborrow', '06/28/1989', '401 East Trail', 'NJ', '04972', 'United States');
insert into tutorial_client (FirstName, LastName, DateOfBirth, StreetAddress, State, Zipcode, Country) values ('Charlton', 'Twallin', '03/30/1969', '250 Muir Place', 'FL', '24150', 'United States');
insert into tutorial_client (FirstName, LastName, DateOfBirth, StreetAddress, State, Zipcode, Country) values ('Paulie', 'Fosten', '01/06/1990', '88791 Eastlawn Place', 'DC', '12200', 'United States');


insert into tutorial_case (ClientID_id, CaseNumber, BenchWarrant, isCaseClosed, isDomesticViolence, JailTimeSuspended, SentenceStart, SentenceEnd, treatmentOrdered, caseOutcomeID_id, sentencingStatusID_id, courtID_id) values (8, 8292, '273.10', false, false, 5, '2017-06-04', '2017-10-11', 'etiam faucibus cursus urna ut tellus nulla ut erat id mauris vulputate elementum nullam', 4, 1, 1);
insert into tutorial_case (ClientID_id, CaseNumber, BenchWarrant, isCaseClosed, isDomesticViolence, JailTimeSuspended, SentenceStart, SentenceEnd, treatmentOrdered, caseOutcomeID_id, sentencingStatusID_id, courtID_id) values (6, 8157, '1475.22', true, false, null, '2017-07-01', '2017-12-15', 'posuere cubilia curae mauris viverra', 1, 2, 1);
insert into tutorial_case (ClientID_id, CaseNumber, BenchWarrant, isCaseClosed, isDomesticViolence, JailTimeSuspended, SentenceStart, SentenceEnd, treatmentOrdered, caseOutcomeID_id, sentencingStatusID_id, courtID_id) values (6, 6823, '2961.67', false, true, 18, '2017-06-28', '2017-10-15', 'ac lobortis vel dapibus at diam nam', 1, 3, 1);
insert into tutorial_case (ClientID_id, CaseNumber, BenchWarrant, isCaseClosed, isDomesticViolence, JailTimeSuspended, SentenceStart, SentenceEnd, treatmentOrdered, caseOutcomeID_id, sentencingStatusID_id, courtID_id) values (9, 3432, '1229.59', false, false, 8, '2017-06-10', '2017-11-03', 'consequat dui nec nisi volutpat eleifend donec ut dolor morbi vel lectus in quam fringilla rhoncus mauris enim', 2, 1, 4);
insert into tutorial_case (ClientID_id, CaseNumber, BenchWarrant, isCaseClosed, isDomesticViolence, JailTimeSuspended, SentenceStart, SentenceEnd, treatmentOrdered, caseOutcomeID_id, sentencingStatusID_id, courtID_id) values (8, 1916, '2047.63', false, true, 10, '2017-05-23', '2017-11-17', 'lorem quisque ut erat curabitur gravida nisi at nibh', 1, 1, 4);
insert into tutorial_case (ClientID_id, CaseNumber, BenchWarrant, isCaseClosed, isDomesticViolence, JailTimeSuspended, SentenceStart, SentenceEnd, treatmentOrdered, caseOutcomeID_id, sentencingStatusID_id, courtID_id) values (7, 7104, '2180.45', true, true, 17, '2017-05-30', '2017-11-10', 'at lorem integer tincidunt ante vel ipsum praesent blandit lacinia erat vestibulum sed magna at nunc commodo placerat praesent', 3, 3, 4);
insert into tutorial_case (ClientID_id, CaseNumber, BenchWarrant, isCaseClosed, isDomesticViolence, JailTimeSuspended, SentenceStart, SentenceEnd, treatmentOrdered, caseOutcomeID_id, sentencingStatusID_id, courtID_id) values (7, 9765, '298.98', true, false, 13, '2017-07-19', '2017-11-25', 'augue vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae donec pharetra', 1, 3, 1);
insert into tutorial_case (ClientID_id, CaseNumber, BenchWarrant, isCaseClosed, isDomesticViolence, JailTimeSuspended, SentenceStart, SentenceEnd, treatmentOrdered, caseOutcomeID_id, sentencingStatusID_id, courtID_id) values (7, 1738, '1930.82', true, false, 20, '2017-06-05', '2017-10-23', 'posuere cubilia curae donec pharetra magna vestibulum aliquet ultrices erat', 3, 2, 3);
insert into tutorial_case (ClientID_id, CaseNumber, BenchWarrant, isCaseClosed, isDomesticViolence, JailTimeSuspended, SentenceStart, SentenceEnd, treatmentOrdered, caseOutcomeID_id, sentencingStatusID_id, courtID_id) values (4, 6666, '940.70', false, true, 11, '2017-06-05', '2017-11-19', 'donec odio justo sollicitudin ut suscipit a feugiat et eros vestibulum ac est lacinia nisi venenatis tristique', 1, 3, 1);
insert into tutorial_case (ClientID_id, CaseNumber, BenchWarrant, isCaseClosed, isDomesticViolence, JailTimeSuspended, SentenceStart, SentenceEnd, treatmentOrdered, caseOutcomeID_id, sentencingStatusID_id, courtID_id) values (9, 1221, '115.70', true, true, null, '2017-05-14', '2017-09-14', 'luctus et ultrices posuere cubilia curae', 1, 2, 2);
insert into tutorial_case (ClientID_id, CaseNumber, BenchWarrant, isCaseClosed, isDomesticViolence, JailTimeSuspended, SentenceStart, SentenceEnd, treatmentOrdered, caseOutcomeID_id, sentencingStatusID_id, courtID_id) values (6, 7462, '2547.03', false, false, null, '2017-07-18', '2017-10-18', 'suspendisse potenti in eleifend quam a odio', 4, 1, 1);
insert into tutorial_case (ClientID_id, CaseNumber, BenchWarrant, isCaseClosed, isDomesticViolence, JailTimeSuspended, SentenceStart, SentenceEnd, treatmentOrdered, caseOutcomeID_id, sentencingStatusID_id, courtID_id) values (5, 5950, '324.24', true, true, 5, '2017-05-30', '2017-12-20', 'lacinia sapien quis libero nullam sit amet turpis elementum ligula vehicula consequat morbi a ipsum integer a nibh in quis', 4, 2, 4);
insert into tutorial_case (ClientID_id, CaseNumber, BenchWarrant, isCaseClosed, isDomesticViolence, JailTimeSuspended, SentenceStart, SentenceEnd, treatmentOrdered, caseOutcomeID_id, sentencingStatusID_id, courtID_id) values (3, 4534, '1389.22', false, true, 15, '2017-06-18', '2017-11-06', 'natoque penatibus et magnis dis parturient montes nascetur ridiculus mus etiam vel augue vestibulum rutrum rutrum neque aenean auctor gravida', 1, 1, 1);
insert into tutorial_case (ClientID_id, CaseNumber, BenchWarrant, isCaseClosed, isDomesticViolence, JailTimeSuspended, SentenceStart, SentenceEnd, treatmentOrdered, caseOutcomeID_id, sentencingStatusID_id, courtID_id) values (7, 6437, '153.70', false, true, null, '2017-05-09', '2017-11-13', 'in imperdiet et commodo vulputate justo in blandit ultrices enim lorem ipsum dolor sit amet consectetuer adipiscing elit', 2, 2, 3);

-- Couple cases for client number 1
