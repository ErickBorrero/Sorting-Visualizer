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



#def mergesort(A, start, end):
#    """Merge sort."""

#    if end <= start:
#        return

#    mid = start + ((end - start + 1) // 2) - 1
#    mergesort(A, start, mid)
#    mergesort(A, mid + 1, end)
#    merge(A, start, mid, end)
#    yield A

#def merge(A, start, mid, end):
#    """Helper function for merge sort."""
    
#    merged = []
#    leftIdx = start
#    rightIdx = mid + 1

#    while leftIdx <= mid and rightIdx <= end:
#        if A[leftIdx] < A[rightIdx]:
#            merged.append(A[leftIdx])
#            leftIdx += 1
#        else:
#            merged.append(A[rightIdx])
#            rightIdx += 1

#    while leftIdx <= mid:
#        merged.append(A[leftIdx])
#        leftIdx += 1

#    while rightIdx <= end:
#        merged.append(A[rightIdx])
#        rightIdx += 1

#    for i, sorted_val in enumerate(merged):
#        A[start + i] = sorted_val
#        yield A

print(merge_sort(x+50))
