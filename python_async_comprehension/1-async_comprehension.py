#!/usr/bin/env python3
"""Module containing an asynchronous comprehension."""

from typing import List

async_generator = __import__('0-async_generator').async_generator


async def async_comprehension() -> List[float]:
    """Collect and return 10 numbers from async_generator."""
    return [number async for number in async_generator()]
