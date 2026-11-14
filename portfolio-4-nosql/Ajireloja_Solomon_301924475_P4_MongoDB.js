// Run once in mongosh against a fresh exercise database.
// These records are fictional events for the case study.
(async function () {
  db = db.getSiblingDB('portfolio_nosql');
  if ((await db.getCollectionNames()).includes("membership_events")) {
    throw new Error('The exercise collection already exists. Use a fresh database.');
  }

  // The validator checks the stable event fields while details can vary.
  await db.createCollection("membership_events", {
    validator: {
    "$jsonSchema": {
        "bsonType": "object",
        "required": [
            "_id",
            "schemaVersion",
            "simulation",
            "eventType",
            "occurredAt",
            "source",
            "embedded",
            "references",
            "details"
        ],
        "properties": {
            "_id": {
                "bsonType": "string",
                "minLength": 1
            },
            "schemaVersion": {
                "enum": [
                    1
                ]
            },
            "simulation": {
                "enum": [
                    true
                ]
            },
            "eventType": {
                "bsonType": "string",
                "enum": [
                    "membership_started",
                    "membership_ended"
                ]
            },
            "occurredAt": {
                "bsonType": "date"
            },
            "source": {
                "bsonType": "object",
                "required": [
                    "entity",
                    "key",
                    "snapshot"
                ],
                "properties": {
                    "entity": {
                        "enum": [
                            "membership"
                        ]
                    },
                    "key": {
                        "bsonType": "object",
                        "required": [
                            "membership_id"
                        ]
                    },
                    "snapshot": {
                        "bsonType": "object"
                    }
                }
            },
            "embedded": {
                "bsonType": "object"
            },
            "references": {
                "bsonType": "object"
            },
            "details": {
                "bsonType": "object"
            }
        }
    }
},
    validationLevel: 'strict', validationAction: 'error'
  });

  // Insert the four example events and show their IDs.
  printjson(await db.getCollection("membership_events").insertMany([
    {
        "_id": "event_000001",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "membership_started",
        "occurredAt": ISODate("2030-01-01T10:00:00Z"),
        "source": {
            "entity": "membership",
            "key": {
                "membership_id": 3001
            },
            "snapshot": {
                "membership_id": 3001,
                "member_id": 1001,
                "congregation_id": 2001,
                "start_date": "2023-01-15",
                "end_date": null,
                "status": "active"
            }
        },
        "embedded": {
            "member": [
                {
                    "key": {
                        "member_id": 1001
                    },
                    "snapshot": {
                        "member_id": 1001,
                        "given_name": "Avery",
                        "family_name": "Bennett",
                        "email": "avery.bennett@example.test",
                        "birth_date": "1988-04-12"
                    },
                    "via": [
                        "membership.member_id → member"
                    ]
                }
            ],
            "congregation": [
                {
                    "key": {
                        "congregation_id": 2001
                    },
                    "snapshot": {
                        "congregation_id": 2001,
                        "name": "Cedar Grove",
                        "city": "Portland",
                        "founded_date": "1952-06-01"
                    },
                    "via": [
                        "membership.congregation_id → congregation"
                    ]
                }
            ]
        },
        "references": {},
        "details": {
            "channel": "web"
        }
    },
    {
        "_id": "event_000002",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "membership_ended",
        "occurredAt": ISODate("2030-01-01T10:01:00Z"),
        "source": {
            "entity": "membership",
            "key": {
                "membership_id": 3001
            },
            "snapshot": {
                "membership_id": 3001,
                "member_id": 1001,
                "congregation_id": 2001,
                "start_date": "2023-01-15",
                "end_date": null,
                "status": "active"
            }
        },
        "embedded": {
            "member": [
                {
                    "key": {
                        "member_id": 1001
                    },
                    "snapshot": {
                        "member_id": 1001,
                        "given_name": "Avery",
                        "family_name": "Bennett",
                        "email": "avery.bennett@example.test",
                        "birth_date": "1988-04-12"
                    },
                    "via": [
                        "membership.member_id → member"
                    ]
                }
            ],
            "congregation": [
                {
                    "key": {
                        "congregation_id": 2001
                    },
                    "snapshot": {
                        "congregation_id": 2001,
                        "name": "Cedar Grove",
                        "city": "Portland",
                        "founded_date": "1952-06-01"
                    },
                    "via": [
                        "membership.congregation_id → congregation"
                    ]
                }
            ]
        },
        "references": {},
        "details": {
            "channel": "mobile",
            "note": "Illustrative event-specific metadata",
            "examples": {
                "event_details": "illustrative event_details",
                "recorded_by": "illustrative recorded_by"
            }
        }
    },
    {
        "_id": "event_000003",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "membership_started",
        "occurredAt": ISODate("2030-01-01T10:02:00Z"),
        "source": {
            "entity": "membership",
            "key": {
                "membership_id": 3002
            },
            "snapshot": {
                "membership_id": 3002,
                "member_id": 1002,
                "congregation_id": 2002,
                "start_date": "2020-03-01",
                "end_date": "2022-08-31",
                "status": "ended"
            }
        },
        "embedded": {
            "member": [
                {
                    "key": {
                        "member_id": 1002
                    },
                    "snapshot": {
                        "member_id": 1002,
                        "given_name": "Jordan",
                        "family_name": "Rivera",
                        "email": "jordan.rivera@example.test",
                        "birth_date": null
                    },
                    "via": [
                        "membership.member_id → member"
                    ]
                }
            ],
            "congregation": [
                {
                    "key": {
                        "congregation_id": 2002
                    },
                    "snapshot": {
                        "congregation_id": 2002,
                        "name": "Harbor Light",
                        "city": "Salem",
                        "founded_date": null
                    },
                    "via": [
                        "membership.congregation_id → congregation"
                    ]
                }
            ]
        },
        "references": {},
        "details": {
            "channel": "web"
        }
    },
    {
        "_id": "event_000004",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "membership_ended",
        "occurredAt": ISODate("2030-01-01T10:03:00Z"),
        "source": {
            "entity": "membership",
            "key": {
                "membership_id": 3002
            },
            "snapshot": {
                "membership_id": 3002,
                "member_id": 1002,
                "congregation_id": 2002,
                "start_date": "2020-03-01",
                "end_date": "2022-08-31",
                "status": "ended"
            }
        },
        "embedded": {
            "member": [
                {
                    "key": {
                        "member_id": 1002
                    },
                    "snapshot": {
                        "member_id": 1002,
                        "given_name": "Jordan",
                        "family_name": "Rivera",
                        "email": "jordan.rivera@example.test",
                        "birth_date": null
                    },
                    "via": [
                        "membership.member_id → member"
                    ]
                }
            ],
            "congregation": [
                {
                    "key": {
                        "congregation_id": 2002
                    },
                    "snapshot": {
                        "congregation_id": 2002,
                        "name": "Harbor Light",
                        "city": "Salem",
                        "founded_date": null
                    },
                    "via": [
                        "membership.congregation_id → congregation"
                    ]
                }
            ]
        },
        "references": {},
        "details": {
            "channel": "mobile",
            "note": "Illustrative event-specific metadata",
            "examples": {
                "event_details": "illustrative event_details",
                "recorded_by": "illustrative recorded_by"
            }
        }
    }
]));
  await db.getCollection("membership_events").createIndex({eventType: 1, occurredAt: -1}, {name: 'event_type_time'});

  // 1. Find the first sample event type (up to five documents).
  printjson(await db.getCollection("membership_events").find({"eventType":"membership_started"}).sort({_id:1}).limit(5).toArray());

  // 2. Find events for the first source record using nested key fields (up to five).
  printjson(await db.getCollection("membership_events").find({"source.key.membership_id":3001}).sort({_id:1}).limit(5).toArray());

  // 3. Find events in the sample time range using a MongoDB Date filter (up to five).
  printjson(await db.getCollection("membership_events").find({"occurredAt":{"$gte":ISODate("2030-01-01T10:00:00Z"), "$lt":ISODate("2030-01-01T11:00:00Z")}}).sort({_id:1}).limit(5).toArray());

  // 4. Count documents for each event type.
  printjson(await db.getCollection("membership_events").aggregate([{"$group":{"_id":"$eventType", "documentCount":{"$sum":1}}}, {"$sort":{"_id":1}}]).toArray());

  // A date stored as text should be rejected by the validator.
  try {
    await db.getCollection("membership_events").insertOne({...{
    "_id": "event_000001",
    "schemaVersion": 1,
    "simulation": true,
    "eventType": "membership_started",
    "occurredAt": ISODate("2030-01-01T10:00:00Z"),
    "source": {
        "entity": "membership",
        "key": {
            "membership_id": 3001
        },
        "snapshot": {
            "membership_id": 3001,
            "member_id": 1001,
            "congregation_id": 2001,
            "start_date": "2023-01-15",
            "end_date": null,
            "status": "active"
        }
    },
    "embedded": {
        "member": [
            {
                "key": {
                    "member_id": 1001
                },
                "snapshot": {
                    "member_id": 1001,
                    "given_name": "Avery",
                    "family_name": "Bennett",
                    "email": "avery.bennett@example.test",
                    "birth_date": "1988-04-12"
                },
                "via": [
                    "membership.member_id → member"
                ]
            }
        ],
        "congregation": [
            {
                "key": {
                    "congregation_id": 2001
                },
                "snapshot": {
                    "congregation_id": 2001,
                    "name": "Cedar Grove",
                    "city": "Portland",
                    "founded_date": "1952-06-01"
                },
                "via": [
                    "membership.congregation_id → congregation"
                ]
            }
        ]
    },
    "references": {},
    "details": {
        "channel": "web"
    }
}, _id: 'invalid_date_example', occurredAt: 'not-a-date'});
  } catch (error) { print('Invalid date error: ' + error.code); }

  // Reusing an event ID should be rejected by the unique _id index.
  try { await db.getCollection("membership_events").insertOne({
    "_id": "event_000001",
    "schemaVersion": 1,
    "simulation": true,
    "eventType": "membership_started",
    "occurredAt": ISODate("2030-01-01T10:00:00Z"),
    "source": {
        "entity": "membership",
        "key": {
            "membership_id": 3001
        },
        "snapshot": {
            "membership_id": 3001,
            "member_id": 1001,
            "congregation_id": 2001,
            "start_date": "2023-01-15",
            "end_date": null,
            "status": "active"
        }
    },
    "embedded": {
        "member": [
            {
                "key": {
                    "member_id": 1001
                },
                "snapshot": {
                    "member_id": 1001,
                    "given_name": "Avery",
                    "family_name": "Bennett",
                    "email": "avery.bennett@example.test",
                    "birth_date": "1988-04-12"
                },
                "via": [
                    "membership.member_id → member"
                ]
            }
        ],
        "congregation": [
            {
                "key": {
                    "congregation_id": 2001
                },
                "snapshot": {
                    "congregation_id": 2001,
                    "name": "Cedar Grove",
                    "city": "Portland",
                    "founded_date": "1952-06-01"
                },
                "via": [
                    "membership.congregation_id → congregation"
                ]
            }
        ]
    },
    "references": {},
    "details": {
        "channel": "web"
    }
}); }
  catch (error) { print('Duplicate ID error: ' + error.code); }

  print('Document count: ' + await db.getCollection("membership_events").countDocuments());
})().catch(error => { print(error.stack || String(error)); quit(1); });
