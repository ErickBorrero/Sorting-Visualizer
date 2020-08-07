import random

x = [random.randint(0, 50) for i in range(50)]


def merge_sort(nums):
    if len(nums) <= 1:
        return nums

    mid = len(nums) // 2
    left = merge_sort(nums[:mid])
    right = merge_sort(nums[mid:])

    return merge(left, right)


def merge(a, b):
    merged = []
    a_index, b_index = 0, 0

    while a_index < len(a) and b_index < len(b):

        if a[a_index] < b[b_index]:
            merged.append(a[a_index])
            a_index += 1
        else:
            merged.append(b[b_index])
            b_index += 1

    if a_index == len(a):
        merged.extend(b[b_index:])
    else:
        merged.extend(a[a_index:])
    return merged


print(merge_sort(x+50))
