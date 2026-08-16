#!/usr/bin/env python3
"""Find schools by topic in a MongoDB collection."""


def schools_by_topic(mongo_collection, topic):
    """Return all schools that teach the given topic."""
    return list(mongo_collection.find({"topics": topic}))
